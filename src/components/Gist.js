import React, { Component } from 'react';
import axios from 'axios';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

class Gist extends Component {
  state = {
    code: '',
  }

  componentDidMount() {
    (async () => {
      try {
        const { gist } = this.props;
        const files = Object.keys(gist.files).map(key => gist.files[key]);
        const { data } = await axios.get(
          files[0].raw_url
        );
        console.log(data);
        this.setState({ code: data });
      } catch (error) {
        console.log(error);
      }
    })();
  }

  onChange = (event) => {
    console.log(event);
  }

  render() {
    const { code } = this.state;
    const { gist } = this.props;
    const file = Object.keys(gist.files).map(key => gist.files[key])[0];
    const language = file.language.toLowerCase();
    console.log(file);
    return (
      <div>
        <a href={file.raw_url}>{file.filename}</a>
        <AceEditor
          mode={language}
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          value={code}
          fontSize={14}
          editorProps={{ $blockScrolling: true }}
          theme="monokai"
          highlightActiveLine
        />
      </div>
    );
  }
}

export default Gist;
