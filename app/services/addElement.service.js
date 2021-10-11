const ipc = require('electron').ipcRenderer;

// eslint-disable-next-line import/prefer-default-export
export const addElementService = {
  addElement
};

function addElement(element) {
  console.log('in service');
  // console.log(element.video);

  return new Promise((resolve, reject) => {
    // will send the element object here.
    ipc.send('ADD_ELEMENT', element);
    // once I get the information back, pass this to actions so that
    // my store updates with the information
    ipc.on('ELEMENT_ADDED', (event, result) => {
      if (result.text !== 'success') {
        // eslint-disable-next-line no-shadow
        const error = result.message;
        return reject(error);
      }
      return resolve(result);
    });
    // e slint-disable-next-line promise/always-return
  }).then(message => {
    // eslint-disable-next-line no-shadow
    return message;
  });
}
