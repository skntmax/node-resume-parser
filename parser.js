const ResumeParser = require('simple-resume-parser');

// From file


var filePath = __dirname + '/my-uploads'; 

async function parseCV (fileName) {
const resume = new ResumeParser(filePath+`/${fileName}`);

// From URL
// const resume = new ResumeParser("https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf");

//Convert to JSON Object
  return resume.parseToJSON()
  .then(data => {
    return  data 
  })
  .catch(error => {
    console.error(error);
  });

//Save to JSON File
 
resume.parseToFile('converted') //output subdirectory
  .then(file => {
    console.log('Yay! ', file);
  })
  .catch(error => {
    console.error(error);
  });

 }


 module.exports= {parseCV}