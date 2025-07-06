from flask import Flask, render_template, request, jsonify
from itertools import zip_longest
app = Flask(__name__)


students1 = [
        
    ]

students2 = [
        
    ]
students3 = [
        
    ]

students4 = [

    ]

removed_students = []

@app.route('/')
def index():
   return render_template('index.html', col1=students1, col2=students2, col3=students3, col4=students4, remove=removed_students)

@app.route('/update', methods=['POST'])
def update():
    data = request.get_json()
    name = data.get("name")
    if name:
        print(f"受け取った名前: {name}")
        global students1, students2, removed_students
        if len(removed_students) < 2:
            removed_students.append(name)
        else:
            removed_students.pop(0)
            removed_students.append(name)

        # students1, students2 の中から探す
        newstudent1 = []
        newstudent2 = []
        newstudent1 = [student for student in students1 if student["name"] != name]
        students1 = newstudent1
        newstudent2 = [student for student in students2 if student["name"] != name]
        students2 = newstudent2

        return jsonify({"status": "ok", "moved": name})
    return jsonify({"status": "error"})

if __name__ == '__main__':
    app.run(debug=True)