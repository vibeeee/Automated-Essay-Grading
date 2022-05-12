import getopt
from unittest import result
import resources as aeg
import sys
import json
import os
from resources.aeg import getSentences
from resources.aeg import calc_grammar

question_id = None
arg_student = None

results = {}

path = os.getcwd()
parent = os.path.dirname(path)

try:
    argv = sys.argv[1:]
except:
    pass

opts, args = getopt.getopt(argv, "i:s:", ["question_id","arg_student"])

for opt, arg in opts:
    if opt in ['-i', '--question_id']:
        question_id = arg
    elif opt in ['-s', '--arg_student']:
        arg_student = arg

prof_answer = [
        "The issue is whether Sandy can recover the “signed moon poster” after she saw the poster for sale on craigslist and realized that it was hers and that she had mistakenly left it in the desk drawer she had sold years before. The answer depends on the classification of the property (poster) as abandoned, lost or mislaid. One who abandons property loses title to it. In contrast, the original owner of mislaid property (or lost property) retains title to it. Here, the poster is clearly not abandoned as Sandy did not have the intent to relinquish her claim to it. The poster will most likely be classified as mislaid property. Mislaid property is property that reasonably seems to be intentionally placed in a specific location and then later forgotten. In this case, the poster is mislaid because Sandy seemed to have placed the poster in the drawer for safe keeping and then forgot about it. Additionally, she had no intention of selling the poster as part of the price for the desk. Therefore, Sandy has a superior claim of title of the “Moon” poster than the current possessor of it.",
        "At issue is whether Mike obtained rights over the five feet of driveway that encroached onto Daniel’s property. As Daniel did not grant Mike any right to use this stretch of property, Mike can obtain rights to this tract of property by prescriptive easement. A prescriptive easement is created when a person adversely and continuously uses a tract of the true owner’s land for the requisite statutory period. Paving the five-foot tract of Daniel’s land was an open and notorious use of that land which could have put Daniel on notice had he inspected his property. Mike’s use of the five-foot tract was also hostile, as he did not have permission from Daniel, and actual and continuous as he paved the land and used it as part of his driveway for the statutory period of time required to acquire rights to the five-foot tract of land. Although Daniel had tenants living on his land when Mike paved it, it was up to Daniel to tend to his land and see that no one encroached upon it. As Daniel did not bring an action until after seven years had passed since Mike paved the tract of land, Daniel will lose and Mike will acquire an easement by prescription.",
        "At issue is whether Pedro is allowed to alter the dirt road, over which he has rights by express easement contained in the deed from Alejandro. If the owner of the dominant estate changes the scope of the easement, he can be enjoined by the owner of the servient estate from changing the scope if the servient estate owner can show that it would create an unreasonable burden to the servient estate and exceeds normal, foreseeable development. Although Pedro, as the new owner of the dominant estate, has an express easement with rights to use the dirt road, Raul can argue that Pedro’s intent to triple the width of the dirt road and increase traffic to the residential subdivision exceeds the scope of the easement which was for egress and ingress to Manuel Ranch. While it is foreseeable that the dirt road may need to be paved and expanded to allow for new vehicles and better maintenance of the easement, the tripled expansion of the easement and increase in traffic to the subdivision will likely allow Raul to succeed in resisting Pedro's action.",
        "At issue is whether the Waban restrictions are enforceable against Frank, who took title to his land from an adverse possessor. In order for Gary to enforce the restrictions against Frank, the restrictions must run with the land A restriction runs with the land if it passes automatically to successive owners or occupiers of that land. This equitable servitude must be in writing, with the intent to bind successors in interest and must touch and concern the land. Successors in interest must also have notice that such a restriction exists and is in force. The former owner of the all the parcels inserted an equitable servitude into all the deeds of the new property owners with the intent that they preserve the natural environment around the Lake. Such a restriction touches and concerns each parcel of land, as the owners are barred from making improvements that are not in line with the restriction. As for the notice requirement, although Pat took possession of the property from Seth as an adverse possessor who then sold the property to Frank, adjoining property owners may still enforce the restriction. Frank could have performed a title search to examine who owned the property before Pat where he may have found the restriction in Seth’s deed, if it was recorded. More importantly, Frank also could have been put on constructive or implied notice if one of the other property owners informed him of the restriction or if he observed that there were not any other permanent structures on Lake Waban, which might have tipped him off that such an equitable restriction enforcing conservation may be in place. Although Frank was not an original purchaser, and bought the property from an adverse possessor, the equitable servitude still runs with the land and may be enforced by Gary, an adjoining property owner who is under the same restriction and has standing to enforce it in a court of equity.",
        "The issue is what amount of damages SLAM can recover, if any. Generally, expectation damages are assessed by putting the non-breaching party in as good as a position as they would have been had the contract been performed. With goods that is measured by lost profit, if they would have had more than one of those goods to sell. Here, SLAM has an unlimited amount of Waveskis it can sell, and therefore an unlimited amount of profit. It resold the Waveski, so was only out the profit it would have made had Bilge not breached. The contract price was $10,000 and the price to Slam was $7,000, meaning there was a profit of $3,000. Because Bilge had already made a down payment of $2,000 SLAM will recover $1,000, and Bilge will not get his down payment back.",
    ]

results.update({'id' : question_id})
results.update({'std_answer':arg_student})
results.update({'prof_sentences': getSentences(prof_answer[int(question_id)])})
  
#order of the function calls to get text classification solution
rulebook = aeg.create_rulebook(question_id)
clean_rulebook = aeg.clean_rulebook(rulebook)
keywords_rulebook = aeg.create_keywords_rulebook(clean_rulebook)
tfidf_rulebook= aeg.create_tfidf_rulebook(clean_rulebook, keywords_rulebook)
pro_results = aeg.label_student_answer(prof_answer[int(question_id)], tfidf_rulebook)
std_results = aeg.label_student_answer(arg_student, tfidf_rulebook)
results = aeg.results(results, arg_student)
results.update({'topics' : std_results})
results.update({'prof_topics': pro_results})

grammar = calc_grammar(arg_student)
grammar_results = {}

index = 0
for error in grammar:
    name = "error" + str(index)
    grammar_results.update({name : {}})
    grammar_results[name].update({'startLocation' : error.offset})
    grammar_results[name].update({'endLocation' : (error.offset + error.errorLength)})
    grammar_results[name].update({'suggestion' : error.replacements})
    index = index+1


results.update({'grammar_results': grammar_results})

with open("output.json", "w") as outfile:
    json.dump(results, outfile)