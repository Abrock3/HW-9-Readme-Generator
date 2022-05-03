// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    message:
      "What is the name of your project? This will be displayed as the readme title.",
    name: "title",
  },
  {
    type: "input",
    message:
      "Write a description of your project, including why you built it, what problem it solves, and optionally what you learned while making it.",
    name: "description",
  },
  {
    type: "input",
    message:
      "Write the steps a user must take to install your project before use. Otherwise, leave the input blank to omit this section.",
    name: "installation",
  },
  {
    type: "input",
    message:
      "Write instructions on how to use the application, and provide examples. You'll be provided with an opportunity to embed a screenshot.",
    name: "usage",
  },
  {
    type: "input",
    message:
      "If you have a screenshot you'd like to embed in the usage section, paste the relative filepath here. If you are choosing not to embed an image, Otherwise, leave the input blank to omit this section.",
    name: "screenshotPath",
  },
  {
    type: "input",
    message:
      "How can other developers contribute, if they wish? If this isn't applicable, leave the input blank to omit this section.",
    name: "contribute",
  },
  {
    type: "input",
    message:
      "If you wish to include testing instructions or examples, input them here. Otherwise, leave the input blank to omit this section.",
    name: "testing",
  },
  {
    type: "input",
    message:
      "Write a credits section and input it here. Be sure to include collaborators, with links to their GitHub profiles, as well as links to any third party assets and tutorials that you used to build this project.",
    name: "credits",
  },
  {
    type: "list",
    message: "What license would you like to use?",
    choices: ["MIT", "BSD 3-Clause", "GNU GPLv3", "No License"],
    name: "license",
  },
  {
    type: "input",
    message:
      "What's your first and last name? This will be used in the license section.",
    name: "devName",
  },

  {
    type: "input",
    message: "Input your email address for use in a 'questions' section.",
    name: "email",
  },
  {
    type: "input",
    message: "Input your GitHub username for use in a 'questions' section.",
    name: "username",
  },
];

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    assembleReadme(answers);
  });
}

function assembleReadme(readmeData) {
  console.log(readmeData);
  let installationString = "";
  let screenshotString = "";
  let contributionString = "";
  let testingString = "";
  let licenseString = "";
  let licenseBadgeString = "";
  const date = new Date();
  const year = date.getFullYear();
  if (readmeData.installation) {
    installationString = `
    
## Installation:

${readmeData.installation}`;
  }
  if (readmeData.screenshotPath) {
    screenshotString = `
    ![Screenshot](${readmeData.screenshotPath}?raw=true "Screenshot")`;
  }
  if (readmeData.contribute) {
    contributionString = `
    
## Contributing

${readmeData.contribute}`;
  }
  if (readmeData.testing) {
    testingString = `

## Testing

${readmeData.testing}`;
  }
  switch (readmeData.license) {
    case "MIT":
      licenseString = `
      
## License
      
Copyright ${year} ${readmeData.devName}
      
This software is licensed using the MIT license: https://opensource.org/licenses/MIT.`;
      licenseBadgeString = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
      break;
    case "BSD 3-Clause":
      licenseString = `
      
## License
      
Copyright ${year} ${readmeData.devName}
      
This software is licensed using the BSD 3-Clause license: https://opensource.org/licenses/BSD-3-Clause.`;
      licenseBadgeString = `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
      break;
    case "GNU GPLv3":
      licenseString = `
      
## License
      
Copyright ${year} ${readmeData.devName}
      
This software is licensed using the GNU GPLv3 license: https://www.gnu.org/licenses/gpl-3.0.`;
      licenseBadgeString = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
      break;
    case "No License":
      licenseString = `
      
## License
      
Copyright ${year} ${readmeData.devName}`;
      licenseBadgeString = "";
      break;
  }
  let readmeText = `# ${readmeData.title}
${licenseBadgeString}

## Description
${readmeData.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
${
  contributionString
    ? `- [Contributing](#contributing)
`
    : ``
}${
    testingString
      ? `- [Testing](#testing)
`
      : ``
  }- [Credits](#credits)
- [License](#license)
${installationString}

## Usage

${readmeData.usage}${screenshotString}${contributionString}${testingString}

## Credits

${readmeData.credits}${licenseString}

## Questions

Feel free to reach out to me with questions at ${readmeData.email}.
My GitHub profile is at https://github.com/${readmeData.username}.`;
  writeToFile(readmeText);
}

function writeToFile(readMeText) {
  fs.writeFileSync("READMEsample.md", readMeText);
}

// Function call to initialize app
init();
