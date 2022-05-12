from lib2to3.pgen2 import grammar
import spacy
from spacy_wordnet.wordnet_annotator import WordnetAnnotator 
from spacy.lang.en.stop_words import STOP_WORDS
import numpy as np
import csv
import math
import language_tool_python
nlp = spacy.load("en_core_web_lg")

#arg string text
#lemmatizes the stext
#returns string new_string 
def lemmatize(text):
    doc = nlp(text)
    new_list = [token.lemma_ for token in doc]
    new_string = " ".join(new_list)

    return new_string
        
#arg string text
#removes stopwords
#returns string new_string
def remove_stopwords(text):
    new_list = []
    doc = nlp(text)

    tokens = [token.text for token in doc]

    for token in tokens:
        lexeme = nlp.vocab[token]
        if lexeme.is_stop == False:
            new_list.append(token)

    new_string = " ".join(new_list)

    return new_string

#arg string text
#removes punctuation 
#returns string new_string
def remove_punctuation(text):
    new_list = []
    doc = nlp(text)

    tokens = [token.text for token in doc]

    for token in tokens:
        lexeme = nlp.vocab[token]
        if lexeme.is_punct == False:
            new_list.append(token)

    new_string = " ".join(new_list)

    return new_string

#arg string word, string topic
#computes term frequency of a word in a topic
#returns float term_frequency
def tf(word, topic):
    word_count = 0
    total_words = 0
    doc = nlp(topic)

    for token in doc:
        if token.text == word:
            word_count+=1
        total_words+=1

    term_frequency = word_count/total_words
    
    return term_frequency

#arg string word, string clean_rulebook
#computes inverse document frequency of a word in a rulebook
#returns float inverse document frequency
def idf(word, clean_rulebook):
    key_count = 0 #number of keys in the rulebook
    word_count = 0 #number keys containing the word

    for key in clean_rulebook:
        key_count+=1
        if word in clean_rulebook[key]:
            word_count+=1

    #checks for division by 0
    if word_count <= 0:
        print("Error: Incorrect rulebook or word detected!")
        return -1

    inverse_document_frequency = math.log10(key_count/word_count)

    return inverse_document_frequency

#arg string text, list of tuples (string keyword, float tfidf)
#adds each keyword tfidf found in a topic
#returns float count
def keyword_count(text, tfidf_keywords):
    count = 0
    doc = nlp(text)

    for token in doc:
        for val in tfidf_keywords:
            if token.text == val[0]:
                count+=val[1]
            
    return count    

#arg string id
#creates a rulebook defined by a dictionary topic:answer
#returns dict rulebook string key: string value
def create_rulebook(question_id):
    rulebook = {}
    
    with open("resources/rulebook.csv", "r", encoding="utf-8") as f:
        data = csv.reader(f)

        for line in data:
            if "passage" not in line and "question" not in line:
                if str(question_id) in line:
                    rulebook.update({line[1]:line[2]})

    return rulebook

#arg dictionary rulebook string key: string value
#Removes stopwords, punctuation. Applies lemmatization and lower case to words
#returns dictionary new_rulebook string key: string value
def clean_rulebook(rulebook):
    clean_rulebook = {}

    for key in rulebook:
        new_string = remove_punctuation(rulebook[key])
        new_string = remove_stopwords(new_string)
        new_string = lemmatize(new_string)
        new_string = new_string.lower()
        clean_rulebook.update({key:new_string})

    return clean_rulebook
        
#arg dictionary rulebook string key: string value
#creates a rulebook with keywords
#returns dict rulebook string key: list of string values
def create_keywords_rulebook(clean_rulebook):
    keywords_rulebook = {}

    for key in clean_rulebook:
        keyword_list = []
        doc = nlp(clean_rulebook[key])

        for token in doc:
            keyword_list.append(token.text)

        keywords_rulebook.update({key:keyword_list})
    
    return keywords_rulebook  

#args dict clean_rulebook string key: string value, dict keywords_rulebook string key: list of string values
#creates a rulebook with list of tuple values (keyword, tfidf)   
#returns dict tfidf_rulebook string key: list of tuples (string keywords, float tfidf)
def create_tfidf_rulebook(clean_rulebook, keywords_rulebook):
    tfidf_rulebook = {}

    for topic in keywords_rulebook:
        tfidf_list = [] 

        for word in keywords_rulebook[topic]:
            tfidf = tf(word, clean_rulebook[topic]) * idf(word, clean_rulebook)
            tfidf_list.append((word, tfidf))
        
        tfidf_rulebook.update({topic:tfidf_list})

    return tfidf_rulebook

#arg string word
#returns list of string synonyms
#TODO Fix function so that the list doesn't contain duplicate words
def synonyms(word):
    nlp.add_pipe("spacy_wordnet", after='tagger', config={'lang': nlp.lang})
    token = nlp(word)[0]
    #returns POS tag + lemma
    lemmas = token._.wordnet.lemmas()
    #cleaning output: 
    synlist = [0 for i in range(len(lemmas))]
    for w in range(len(lemmas)):
        lemma = repr(lemmas[w]).split(".")
        s = ''.join(ch for ch  in lemma[3] if ch.isalnum())
        synlist[w]= s
    ms = nlp.vocab.vectors.most_similar(
    np.asarray([nlp.vocab.vectors[nlp.vocab.strings[word]]]))
    words = [nlp.vocab.strings[w] for w in ms[0][0]]

    return synlist + list(set([w.lower() for w in words]))

#arg string stu_answer, string pro_answer
#unfinished function
#TODO implement
def compare_answers(std_answer, pro_answer):
    new_stu_answer = remove_stopwords(std_answer)
    new_pro_answer = remove_stopwords(pro_answer)
   
    doc1 = nlp(new_stu_answer)
    doc2 = nlp(new_pro_answer)

    return doc1.similarity(doc2)

#arg dict rulebook string key: string value
#returns string professor_answer
def create_prof_answer(rulebook):
    professor_answer = ""

    for key in rulebook:
        professor_answer+=rulebook[key]

    return professor_answer

#arg string std_answer, dict topic: list of string keywords
#returns a dictionary with each sentence of the student answer labeled
def label_student_answer(std_answer, tfidf_rulebook):
    doc = nlp(std_answer)
    std_topics = {}
    std_count = {}
    
    for sentence in doc.sents:
        for topic in tfidf_rulebook:
            std_count.update({topic:keyword_count(sentence.text, tfidf_rulebook[topic])})
        
        a_topic = max(std_count, key=std_count.get)
        
        if a_topic in std_topics:
            std_topics[a_topic].append(sentence.text)
        else: 
            std_topics.update({a_topic:[sentence.text]})
            
    return std_topics

def getSentences(std_answer):
    doc = nlp(std_answer)
    sent_list = []
    for sent in doc.sents:
        sent_list.append(sent.text)
    return sent_list

def calc_grammar(text):
    tool = language_tool_python.LanguageTool("en-US")
    matches = tool.check(text)
    print(matches)
    tool.close()
    return matches

def results(results, std_answer):
    results.update({'std_sentences' : getSentences(std_answer) })

    results.update({
        'grammarScore':  100-(len(calc_grammar(std_answer))*5), 
        'similarityScore': None,
        'structureScore': None,
        'coherenceScore:': None,
        'overallScore': None
        })
    
    #returns dictionary
    return results