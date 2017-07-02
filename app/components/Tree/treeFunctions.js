// @flow
import fs from 'fs';
import mkdirp from 'mkdirp';

const getPath = (node) => {
  let path;
  if (node.type === 'file') {
    path = node.path.split(node.name).splice(0, 1);
  } else {
    path = `${node.path}\\`;
  }
  return path;
};

const newFile = (data: Object, fileName: string) => {
  const path = getPath(data);
  fs.writeFile(`${path}${fileName}`, '', (err) => {
    if (err) throw err;
    console.log('created');
  });
  return;
};

const newFolder = (data: Object, folderName: string) => {
  const path = getPath(data);
  mkdirp(`${path}${folderName}`, (err) => {
    if (err) throw err;
    console.log('created');
  });
};

const rename = (data: Object, name: string) => {
  const oldPath = data.path;
  const path = getPath(data);
  const newPath = `${path}${name}`;
  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;
    console.log('renamed');
  });
};

const del = (data: Object) => {
  const path = data.node.path;
  fs.unlink(path, (err) => {
    if (err) throw err;
    console.log('deleted');
  });
};

export default { newFile, newFolder, rename, del };
