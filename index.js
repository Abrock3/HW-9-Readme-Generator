// fs and inquirer packages are required for this app to run, so these lines bring them in
const fs = require("fs");
const inquirer = require("inquirer");
// This array of questions will be used by inquirer to collect info from the user
const questions = [
  {
    type: "input",
    message:
      "What is the name of your project? This will be displayed as the readme title.",
    name: "title",
    // validate will ensure that required sections must be answered by the user
    validate(answer) {
      if (!answer) {
        return "Your readme must have a title.";
      }
      return true;
    },
  },
  {
    type: "input",
    message:
      "Write a description of your project, including why you built it, what problem it solves, and optionally what you learned while making it.",
    name: "description",
    validate(answer) {
      if (!answer) {
        return "Your readme must have a description";
      }
      return true;
    },
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
      "Paste a link to the deployed application. This will be placed in the usage section. You may omit this section by leaving this blank.",
    name: "appLink",
  },
  {
    type: "input",
    message:
      "Write instructions on how to use the application, and provide examples. You'll be provided with an opportunity to embed a screenshot.",
    name: "usage",
    validate(answer) {
      if (!answer) {
        return "Even if it appears intuitive, your readme must have usage instructions";
      }
      return true;
    },
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
    validate(answer) {
      if (!answer) {
        return "Your readme must have a credits section";
      }
      return true;
    },
  },
  {
    // the list type gives the user several options to select from
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
    validate(answer) {
      if (!answer) {
        return "Your readme must include your name in the license section, in case your work is distributed";
      }
      return true;
    },
  },
  {
    type: "input",
    message: "Input your email address for use in a 'questions' section.",
    name: "email",
    validate(answer) {
      if (!answer) {
        return "Your readme should include a way to contact you, even if it's an anonymous email";
      }
      return true;
    },
  },
  {
    type: "input",
    message: "Input your GitHub username for use in a 'questions' section.",
    name: "username",
    validate(answer) {
      if (!answer) {
        return "Your readme should include your GitHub, in case your work is distributed";
      }
      return true;
    },
  },
];

// this is run upon starting the app; it first uses inquirer to ask the user questions about their application, then passes that data into another function
function init() {
  inquirer.prompt(questions).then((answers) => {
    assembleReadme(answers);
  });
}

// this function will take the data the user provided and put it together into a readme
function assembleReadme(readmeData) {
  let installationString = "";
  let screenshotString = "";
  let contributionString = "";
  let testingString = "";
  let licenseString = "";
  let licenseBadgeString = "";
  let appLinkString = "";
  const date = new Date();
  const year = date.getFullYear();

  // the following if statements determine whether the user input data for certain sections, then generates a string of markdown if they did.
  // these strings will later be inserted into the final readme string
  if (readmeData.installation) {
    installationString = `
    
## Installation:

${readmeData.installation}`;
  }
  if (readmeData.appLink){
    appLinkString = `
Link to the deployed app: ${readmeData.appLink}

`;
  }
  if (readmeData.screenshotPath) {
    // Depending on how the user gets the relative filepath of the screenshot, it may have backslashes instead of forward slashes, which doesn't appear to work in markdown.
    // This will replace all back slashes with forward slashes to make the screenshot function properly in markdown
    let moddedScreenshotPath = readmeData.screenshotPath.replaceAll("\\", "/");
    screenshotString = `

Screenshot of the app during function:
![Screenshot](${moddedScreenshotPath}?raw=true "Screenshot")`;
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
- [Questions](#questions)
${installationString}

## Usage

${appLinkString}${
    readmeData.usage
  }${screenshotString}${contributionString}${testingString}

## Credits

${readmeData.credits}${licenseString}

## Questions

Feel free to reach out to me with questions at ${readmeData.email}.

My GitHub profile is at https://github.com/${readmeData.username}.`;
// now that the string is assembled, we can pass it into our next function
  writeToFile(readmeText);
}

// this function uses the file system package to write our assembled readmeText string into a READMEsample.md string
function writeToFile(readMeText) {
  fs.writeFileSync("READMEsample.md", readMeText);
}

// Function call to initialize app
init();
