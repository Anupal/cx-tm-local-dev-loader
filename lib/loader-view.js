'use babel';
/** @jsx etch.dom */
import etch from 'etch'

export default class LoaderView {

  constructor() {
    etch.initialize(this)
  }

  render() {
    return(
      <div class='loader-view'>
        <h1>CXTM-LOCAL-DEV 2.0</h1>
        <p>Please wait while rest of the package is downloaded.</p>
        <p ref='loaderError' style='display:none' class='highlight-error'>Repository is not reachable!</p>
        <progress class='inline-block'></progress>
      </div>
    );
  }

  update () {
    etch.update()
  }

  destroy() {
      etch.destroy(this);
  }

  getDefaultLocation() {
    return 'center';
  }

  getTitle() {
    return 'Loading...';
  }

  getIconName() {
      return 'sync';
  }
}
