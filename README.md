
### `continuous student testing`

This is a group project to aggregate student test results in real time. This is the client side, based on React.

This app shows student progress in data transformation exercises in real time. It compiles the latest submission by each student for each question she/he attempted using Jest tests in their local computers. Test results are sent to a database by a server. This is the front end, where the client pulls and displays data.

![](Live-updates.gif)

## Select Range of Data and Version of the exercise.
The app constainst 2 selectors:
  - **Select the Range of date.** (By default is 'Today'). It sends to the server a string ['today', 'lastWeek', 'lastMonth', 'lastYear'] and the server sends back the data contained in this range of date.

  - **Select Version of exercise.** It gets data from the server to list all the different exercises versions available, when selected sends to the server a string with the version of exercises selected.

Select Date and Version can be combined as the user wants, allowing always to have one date selected and look through different versions of the exercises, or vice versa, selecting on version and changing around the different Dates.

## Four charts are available: 

### `number of students passing each question`

Shows how many students had a passing result for each of the question. When you hover over each bar, a tooltip will show a short description of the question.

### `number of passed questions by student`

Shows, for every student, how many questions she/he had a passing result.

### `% of questions passed by students`

Shows, for all questions submitted by all students, what is the percentage of passing and failed.

### `number of passed and failed questions by student`

Shows, for every student, how many questions she/he had a passing result, and how many are being attempted but not passing.

### `other relevant repos`

[Server](https://github.com/Official-Codaisseur-Graduate/cont-testing-server) and [Exercises](https://github.com/Official-Codaisseur-Graduate/data-transformation-exercise).


### `installation`

## Small summary checklist of the installation.

To install and run this app:
```

1) git clone and run the server.
https://github.com/Official-Codaisseur-Graduate/cont-testing-server

2) Install the client

$ git clone git@github.com:Official-Codaisseur-Graduate/cont-testing-client.git
$ cd cont-testing-client
$ npm install
$ npm start

3) Run the exercise Data Transformation to get your own data.
https://github.com/Official-Codaisseur-Graduate/data-transformation-exercise
```



### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## contributors
This continuous testing project was developed by 
- [Andrea Van Liere](https://github.com/ajvanliere)
- [Keren Kinberg](https://github.com/kerenki)
- [Rafael Olivares](https://github.com/rafaelrolivares)
- [Pedro Abel Diaz](https://github.com/coderHook)

As graduates of the Codaisseur Academy in Amsterdam we developed this tool with the help of Rein op ‘t Land and Kelley van Evert -  teachers and developers at Codaisseur. 
