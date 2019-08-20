# What is this?
This document exists to help both on-board and continually reinforce our best practices regarding the next-mobile repository as well as our React code in general.

----
# Getting Started

## Mobile setup
https://teamsoftwareinc.sharepoint.com/Projects/Next/_layouts/OneNote.aspx?id=%2FProjects%2FNext%2FSiteAssets%2FNEXT%20Notebook&wd=target%28Technical.one%7C684E7675-E7BC-F844-894E-EE851840F134%2FMobile%20Installation%20%E2%80%93%20Simulators%7CADFC5FF3-FC28-4E53-BFDF-821F0FA7D15A%2F%29

## Choose an Editor
### What to Use?
You can use any editor that you prefer so long as it can conform to the requirement below of supporting the .editorconfig rules. Ideally an editor is chosen that facilitates high productivity like Visual Studio, VSCode, WebStorm, or other specialized JavaScript project editors. Do some googling and make your choice!  Also talk to your peers and see what they might use.

### .editorconfig Extension
We are enforcing spacing and other syntactic rules via an extension called EditorConfig. .editorconfig support is baked in on all JetBrains products as well as Visual Studio 2017+; however, you will need to install the EditorConfig extension for VSCode as of 2017.10.03.
>http://editorconfig.org

##Clone the git repository
###Get the clone URL
Hook up to source control via repository clone. The first item that you need to get is the clone URL. The URL can then be used in your chosen IDE to connect to source control.  The beginning of this link shows the where to click on VSTS to get the URL.  Make sure that you are in the appropriate Next project and next-web repository.
>https://docs.microsoft.com/en-us/vsts/git/tutorial/clone?tabs=visual-studio

###Use the clone URL to clone the repository
Webstorm (and other JetBrains products)
>https://www.jetbrains.com/help/webstorm/using-git-integration.html

Visual Studio Code
> https://code.visualstudio.com/docs/editor/versioncontrol

Visual Studio
>https://docs.microsoft.com/en-us/vsts/git/tutorial/clone?tabs=visual-studio

## Open the project in your IDE
The repository next-mobile contains not only the JavaScript source code but also the tests associated with it.

## Install Node.js 6.0 or higher and Yarn
These steps can be completed manually by going to the appropriate websites.  Alternatively, you can use Chocolatey for Windows or Homebrew for Mac to help you install Node and Yarn.

Node.js
>https://nodejs.org/en/download/

Yarn
>https://yarnpkg.com/en/

Chocolatey (for Windows)
>https://chocolatey.org/install

Homebrew (for Mac)
>https://brew.sh/

## Install Project Dependencies
First of all, you may need to restart your IDE and any console windows after the installation of Node and Yarn.  Once you've done so, you should be able to set your current directory in the console to the directory of your repository and run:
>yarn

This will install all of the necessary project dependencies and download all Node packages for you.

## Update custom fonts
We are using a library with custom fonts to show the icons >https://github.com/oblador/react-native-vector-icons.
If we want to update the `icomoon.ttf` to add a new icon we have to update the files
`/next-mobile/fonts/icomoon.ttf`, `/next-mobile/fonts/selection.json` and `/next-mobile/android/app/src/main/assets/fonts/icomoon.ttf`, then we have to delete the folder `/next-mobile/android/app/build`.


## Run the project
>yarn android or yarn ios

It usually works best if you already have an emulator running.

----
#JavaScript Code Guidelines
We are using the JavaScript guidelines set by AirBnB until a need occurs for anything outside of those guidelines.
>http://airbnb.io/javascript/

# JavaScript Linting
Linting is a common JavaScript practice that enforces coding standards, similar to the compile-time checking that .NET and other static languages perform. We are using ESLint, a common library that works well with all JavaScript. Linting rules are executed when a developer requests to build the website. More information on linting and its uses can be found at the ESLint website.
>https://eslint.org/

----
# React Guidelines
## Why Choose React?
React was chosen due to its code and knowledge reuse between the next-web and next-mobile projects. At this time (November 2017) React is one of the fastest-growing and most popular frameworks in use for today's development of web applications. React has a plethora of external resources to on-board a developer and provides a framework for making clean coding decisions.

## .js or .jsx Extension?
.jsx extension is not supported by react-native.

## Component Folder Pattern
We are using the Ducks Folder Pattern to organize our React components into appropriate folders mixing this with `Container` concept.  This allows us to organize by component.

```
/src
  /modules
    /MyModule
      /components
        /MyComponent
          HomeComponent.js // jsx component
          MyComponent.style.js
        /redux
          MyModuleRedux.js //this file should be created using the ducks structure, if this state is user for more that one module it should be changed to the shared folder.
    MyModuleContainer.js      // this file will be used to export the components and add the redux decorators
  HomeComponent.js //root component
```

## Creating a redux file

We are going to be using redux to mantain a global state in the app. This is a short example of how to use redux.
```
// @flow
import type { AdderState } from '../types/adder.types';

//Constant
export const PLUS_ONE = 'myFirstComponent/PLUS_ONE';

//Actions
export function plusOne() {
  return (dispatch: Function) => {
    dispatch({ type: PLUS_ONE });
  };
}

//Initial State
const initialState: AdderState = {
  value: 0,
};

//Reducer
export default (state: AdderState = initialState, action: any): AdderState => {
  switch (action.type) {
    case PLUS_ONE:
      return {
        ...state,
        value: state.value + 1,
      };

    default:
      return state;
  }
};
```

## One Component per File
Please only include one declaration of a component per file.

## Flow
Flow is a static typing library that is commonly-used with React. Flow allows one to declare types for better compile-time checks. More on how Flow and React interact can be found on the flow website as well as examples through our coding.
> https://flow.org/en/docs/react/

## Unit Testing
Our unit testing is performed by the Jest framework in combination with Enzyme. Jest is a common JavaScript unit testing framework that is not React-specific.
>https://facebook.github.io/jest/

Enzyme is a React-specific unit testing facilitator that allows unit testing of rendering and many other React-specific utility tests.
>https://github.com/airbnb/enzyme

##Environmental Config
React reads from the .env files for configuration. Depending on the build type, it will read from .env (default), .env.development, .env.test, or .env.production. The .env.production config file contains tokens that are replaced at build and deployment time. We have wrapped .env.production in Config.js to allow for local production builds that fall back on good defaults. Deployment tokens are preferred over build tokens.

Token for build time replacement
>\#{_token_}#

Token for deployment time replacement
>\_\_\__token____

Unfortunately, Sentry uploads sourcemaps during the yarn build script. This forces us to replace Sentry variables before building. We could move this to deployment if we manually upload sourcemaps later.
>https://docs.sentry.io/clients/javascript/sourcemaps/

## UI/UX
We'll start off using the build in react native ui components and supplementing with third party native modules where necessary. This will help us follow platform guidelines.
http://www.awesome-react-native.com/
