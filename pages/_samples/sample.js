// import * as React from "react";
// import { render } from "react-dom";
// import ReactQuill, { Mixin, Toolbar, Quill } from "react-quill";
// import Dropzone, { ImageFile } from "react-dropzone";
// import { uploadFile, File, FileParams } from "./upload";
// import "react-quill/dist/quill.snow.css";
// import "./style.css";

// const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;
// const __ISIOS__ = navigator.userAgent.match(/iPad|iPhone|iPod/i) ? true : false;

// interface AppProps {}

// interface AppState {
//   contents: string;
//   subject: string;
//   workings?: { [s: number]: any };
//   fileIds?: string[];
// }

// export default sample = ( ) => {
//   constructor(props: AppProps) {
//     super(props);

//     this.state = {
//       subject: "",
//       contents: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
//       workings: {},
//       fileIds: []
//     };
//   }
//   const [subject, setSubject]

//   quillRef: ReactQuill = null;
//   dropzone: Dropzone = null;
//   onKeyEvent = false;

//   saveFile = (file: any) => {
//     console.log("file", file);

//     const nowDate = new Date().getTime();
//     const workings = { ...this.state.workings, [nowDate]: true };
//     this.setState({ workings });

//     return uploadFile([file]).then(
//       (results: File[]) => {
//         const { sizeLargeUrl, objectId } = results[0];

//         workings[nowDate] = false;
//         this.setState({ workings, fileIds: [...this.state.fileIds, objectId] });
//         return Promise.resolve({ url: sizeLargeUrl });
//       },
//       (error: any) => {
//         console.error("saveFile error:", error);
//         workings[nowDate] = false;
//         this.setState({ workings });
//         return Promise.reject(error);
//       }
//     );
//   };

//   onDrop = async (acceptedFiles: ImageFile[]) => {
//     try {
//       await acceptedFiles.reduce((pacc, _file, i) => {
//         return pacc.then(async () => {
//           const { url } = await this.saveFile(_file);

//           const quill = this.quillRef.getEditor();
//           const range = quill.getSelection();
//           quill.insertEmbed(range.index, "image", url);
//           quill.setSelection(range.index + 1);
//           quill.focus();
//         });
//       }, Promise.resolve());
//     } catch (error) {}
//   };

//   imageHandler = () => {
//     if (this.dropzone) this.dropzone.open();
//   };

//   modules = {
//     toolbar: {
//       container: [
//         ["bold", "italic", "underline", "strike", "blockquote"],
//         [{ size: ["small", false, "large", "huge"] }, { color: [] }],
//         [
//           { list: "ordered" },
//           { list: "bullet" },
//           { indent: "-1" },
//           { indent: "+1" },
//           { align: [] }
//         ],
//         ["link", "image", "video"],
//         ["clean"]
//       ],
//       handlers: { image: this.imageHandler }
//     },
//     clipboard: { matchVisual: false }
//   };

//   formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "size",
//     "color",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "video",
//     "align"
//   ];

//   onKeyUp = (event: KeyboardEvent) => {
//     if (!__ISIOS__) return;
//     // enter
//     if (event.keyCode === 13) {
//       this.onKeyEvent = true;
//       this.quillRef.blur();
//       this.quillRef.focus();
//       if (document.documentElement.className.indexOf("edit-focus") === -1) {
//         document.documentElement.classList.toggle("edit-focus");
//       }
//       this.onKeyEvent = false;
//     }
//   };

//   onFocus = () => {
//     if (
//       !this.onKeyEvent &&
//       document.documentElement.className.indexOf("edit-focus") === -1
//     ) {
//       document.documentElement.classList.toggle("edit-focus");
//       window.scrollTo(0, 0);
//     }
//   };

//   onBlur = () => {
//     if (
//       !this.onKeyEvent &&
//       document.documentElement.className.indexOf("edit-focus") !== -1
//     ) {
//       document.documentElement.classList.toggle("edit-focus");
//     }
//   };

//   doBlur = () => {
//     this.onKeyEvent = false;
//     this.quillRef.blur();
//     // force clean
//     if (document.documentElement.className.indexOf("edit-focus") !== -1) {
//       document.documentElement.classList.toggle("edit-focus");
//     }
//   };

//   onChangeContents = (contents: string) => {
//     let _contents: string = null;
//     if (__ISMSIE__) {
//       if (contents.indexOf("<p><br></p>") > -1) {
//         _contents = contents.replace(/<p><br><\/p>/gi, "<p>&nbsp;</p>");
//       }
//     }
//     this.setState({ contents: _contents || contents });
//   };

//   render() {
//     return (
//       <div className="main-panel">
//         <div className="navbar">
//           ReactQuill Typescript with IE11, iOS, Korean Support
//         </div>
//         <div className="main-content">
//           <ReactQuill
//             onRef={(el: any) => (this.quillRef = el)}
//             value={this.state.contents}
//             onChange={this.onChangeContents}
//             onKeyUp={this.onKeyUp}
//             onFocus={this.onFocus}
//             onBlur={this.onBlur}
//             theme="snow"
//             modules={this.modules}
//             formats={this.formats}
//           />
//           <Dropzone
//             ref={(el: Dropzone) => (this.dropzone = el)}
//             style={{ width: 0, height: 0 }}
//             onDrop={this.onDrop}
//             accept="image/*"
//           />
//         </div>
//       </div>
//     );
//   }
// }
