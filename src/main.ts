/**
 * main function
 */
declare const global: {
  [x: string]: () => void;
};

function main() {
  console.log("Main function!!");
}

global.main = main;
