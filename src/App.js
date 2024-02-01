import { useState } from "react";
import { marked } from "marked";
import "./App.css";

function App() {
  const [text, setText] = useState(
    `
  # Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:

  Heres some code, \`<div></div>\`, between 2 backticks.

  \`\`\`
  // this is multi-line code:

  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`

  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.

  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!

  And if you want to get really crazy, even tables:

  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.

  - And of course there are lists.
    - Some are bulleted.
      - With different indentation levels.
          - That look like this.


  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:

  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`
  );

  marked.setOptions({
    breaks: true,
  });

  const insertAtCursor = (value) => {
    const editor = document.getElementById("editor");
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const newText = text.substring(0, start) + value + text.substring(end);
    setText(newText);
    editor.focus();
    editor.setSelectionRange(start + value.length, start + value.length);
  };

  return (
    <div className="App">
      <header>
        <h1 className="header">Markdown Previewer</h1>
      </header>
      <main>
        <section id="editor-container">
          <h2 className="header">Editor</h2>
          <textarea
            id="editor"
            onChange={(event) => {
              setText(event.target.value);
            }}
            value={text}
          ></textarea>
          <div id="toolbar">
            <button onClick={() => insertAtCursor("# ")}>H1</button>
            <button onClick={() => insertAtCursor("## ")}>H2</button>
            <button onClick={() => insertAtCursor("### ")}>H3</button>
            <button onClick={() => insertAtCursor("#### ")}>H4</button>
            <button onClick={() => insertAtCursor("##### ")}>H5</button>
            <button onClick={() => insertAtCursor("###### ")}>H6</button>
          </div>
        </section>
        <section id="preview-container">
          <h2 className="header">Preview</h2>
          <div
            id="preview"
            dangerouslySetInnerHTML={{
              __html: marked(text),
            }}
          ></div>
        </section>
      </main>
      <footer>
        <p>
          &copy; {new Date().getFullYear()} Markdown Previewer. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
