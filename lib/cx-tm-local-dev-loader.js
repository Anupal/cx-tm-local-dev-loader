'use babel';

import LoaderView from './loader-view';
const path = require('path');
const os = require('os');
const download = require('download-git-repo');
const fs = require('fs-extra');
const urlExists = require('url-exists');

export default {
  activate(state) {
    let repoURL = 'https://wwwin-github.cisco.com/anupalmi/cx-tm-local-dev';
    let repoPath = path.join(os.homedir(), '.atom', 'packages', 'cx-tm-local-dev-loader');
    let oldRepoPath = path.join(os.homedir(), '.atom', 'packages', 'cx-tm-local-dev');
    let oldRepoPath2 = path.join(os.homedir(), '.atom', 'packages', 'cx-tm-local-dev-master');
    let tempPath = path.join(os.homedir(), '.atom', 'packages', 'temp-cx-tm-local-dev-loader');

    console.log('Loader started!');
    let view = new LoaderView();
    atom.workspace.open(view);

    // Check if Repo is reachable
    urlExists(repoURL, (err, exists) => {
        if (exists) {
            // Delete current contents of Repo
            fs.removeSync(repoPath);

            // Delete older versions
            fs.removeSync(oldRepoPath);
            fs.removeSync(oldRepoPath2);

            // Download repo and restart
            download(`direct:${repoURL}`, tempPath, { clone: true }, function (err) {
              if (err) throw err;
              else {
                console.log('Done!');
                fs.renameSync(tempPath, repoPath);
                atom.restartApplication();
              }
            });
        } else {
            view.refs.loaderError.style.display = 'block';
        }
    });
  },

  deactivate() {
  },

  serialize() {
  }
};
