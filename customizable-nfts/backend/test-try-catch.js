import fs from 'fs';

const whole_operations = async () => {
  try {
    cadddlert('esaif');
    console.log('dasdsa');
  } catch (error) {
    fs.appendFile('log.csv', error.toString() + ';' + new Date().toLocaleString() + '\n', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('wrriten succesfully to log.txt');
      }
    });
  }
};

whole_operations();
