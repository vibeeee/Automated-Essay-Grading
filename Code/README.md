# AutomatedEssayGrading
A shared codespace for the Automated Essay Grading Project

-----------------------------------------------------------------------

<h2>Dependencies</h2>
<a href="https://www.python.org/"> Python </a>

Download and install Python. 
If you have created a PATH System variable for your python interpreter, create a virtual environment using the following command:

python -m venv [name_of_virtual_environment]

This is highly recommended in order to avoid potential conflicts when working on multiple projects. After you have created your virtual environment, activate or deactivate your virtual environment with the following commands:
[Path to activate file]\activate
[Path to deactivate file]\deactivate


<a href= "https://nodejs.org/en/" > NodeJS </a>

To install required node modules, run the following command: 
```
npm i && cd frontend && npm i && cd .. && cd server && npm i 
```

<a href="https://spacy.io/"> spaCy </a>
```
pip install -U pip setuptools wheel
pip install -U spacy
python -m spacy download en_core_web_lg
```

<a href="https://pypi.org/project/language-tool-python/"> Language Tool </a>
```
pip install language-tool-python
```

<a href="https://numpy.org/"> NumPy </a>
```
pip install numpy
```

<a href="https://scikit-learn.org/stable/index.html"> scikit-learn </a>
```
pip install -U scikit-learn
```

<h2>Commands</h2>

To run the program in the browser, navigate to the server directory and run the following command: 
```
node server.js
```

To save changes made to the frontend:
```
cd frontend && npm run build 
```
