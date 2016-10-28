import os
from flask import Flask, render_template, request, json, url_for, redirect, session
import urllib
from subprocess import Popen, PIPE, STDOUT
#from flask.ext.pymongo import PyMongo

SKIP = [
  "sudo",
  "rm",
  "compgen",
  "gnome-sudoku"
]

app = Flask(__name__)
#app.config['MONGO_DBNAME'] = 'restdb'
#app.config['MONGO_URI'] = 'mongodb://localhost:27017/restdb'
#mongo = PyMongo(app)


@app.route('/')
def hello():
    return redirect(url_for('index'))

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/onload', methods=['GET'])
def translator():
    shell_command = 'bash command.sh'
    event = Popen(shell_command, shell=True, stdin=PIPE, stdout=PIPE,
        stderr=STDOUT)

    output = event.communicate()
    resp = output[0].split('\n')
    resp = sorted(list(set(resp)))

    return json.dumps({'status':'OK', 'resp':resp})

@app.route('/getresult', methods=['POST'])
def getReslut():
    data = request.json
    data = str(data[u'data'])
    item = {"cmd": data}
    cmd = data.split()[0]
    if cmd in SKIP:
       output = "not perimited!!!"
    else:
        event = Popen(data, shell=True, stdin=PIPE, stdout=PIPE,
            stderr=STDOUT)
        output = event.communicate()
        output = output[0]
    #history = mongo.db.history
    #history.insert(item)
    #print [i for i in mongo.db.history.find()]
    return json.dumps({'status':'OK', 'resp':output})

if __name__=="__main__":
    app.run(debug=True)
