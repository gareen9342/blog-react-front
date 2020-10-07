// import React, { useEffect, useState, useCallback, useRef } from 'react'
// import Router from 'next/router'
// import { useDispatch, useSelector } from 'react-redux'
// import CenteredLayout from '../components/CenteredLayout'
// import { Button, Input } from 'antd'
// import useInput from '../hooks/useInput'
// import { searchSrc, DataURIToBlob, Base64toServerImage } from '../util/file'
// import axios from 'axios'
// const write = (props) => {
//     const dispatch = useDispatch()
//     // const { me } = useSelector((state) => state.user)

//     // useEffect(() => {
//     //     if (!me.id) {
//     //         alert('글을 작성하려면 로그인이 필요합니다.')
//     //         Router.push('/login')
//     //     }
//     //     console.log(me)
//     // }, [me && me.id])

//     /************* quill *************/
//     const Quill =
//         typeof window === 'object' ? require('react-quill') : () => false

//     const modules = {
//         toolbar: {
//             container: [
//                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                 [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
//                 [
//                     { list: 'ordered' },
//                     { list: 'bullet' },
//                     { indent: '-1' },
//                     { indent: '+1' },
//                     { align: [] },
//                 ],
//                 ['link', 'image', 'video'],
//                 ['clean'],
//             ],
//             clipboard: {
//                 // toggle to add extra line breaks when pasting HTML:
//                 matchVisual: false,
//             },
//         },
//     }
//     /*
//      * Quill editor formats
//      * See https://quilljs.com/docs/formats/
//      */
//     const formats = [
//         'header',
//         'font',
//         'size',
//         'bold',
//         'italic',
//         'underline',
//         'strike',
//         'blockquote',
//         'list',
//         'bullet',
//         'indent',
//         'link',
//         'image',
//     ]

//     /********* submit */
//     const [subject, onChangesubject] = useInput('')
//     const [contents, setContents] = useState('')

//     const postImage = (data) => {
//         return axios.post('http://localhost:4000/post/image', data, {
//             withCredentials: true,
//         })
//     }
//     const handleSubmit = useCallback(async () => {
//         const imageFormData = new FormData()
//         // searchSrc(contents).map((v, i) => {
//         //     if (v?.length > 1000) {
//         //         //  "data:image/png;base64~~~"는 1000자를 넘어가기 때문에 + base64만 가져오기 위해서
//         //         const imgBase64 = v
//         //         const file = DataURIToBlob(imgBase64)

//         //         const nameMaking =
//         //             `${Math.floor(Math.random() * 3000)}` +
//         //             '_' +
//         //             `${new Date().getTime()}`;

//         //     }

//         // });
//         searchSrc(contents).map((f) => {
//             if (f.length > 1000) {
//                 const imgBase64 = f
//                 const file = DataURIToBlob(imgBase64)
//                 imageFormData.append('image', file)
//             }
//         })
//         console.log(imageFormData)
//         let result = await postImage(imageFormData)
//         if (result) {
//             console.log(result)

//             //   quillInstance.current.root.innerHTML = innerHTML;
//         }
//     }, [contents, subject])

//     return (
//         <>
//             <CenteredLayout>
//                 {/* <Button onClick={handleSubmit}>submit</Button> */}
//                 제목 : <Input value={subject} onChange={onChangesubject} />
//                 {console.log(
//                     searchSrc(contents).map((f) => {
//                         if (f.length > 1000) {
//                             const innerHTML = Base64toServerImage(contents)
//                             console.log(innerHTML)
//                         }
//                     })
//                 )}
//                 <Quill
//                     value={contents}
//                     onChange={setContents}
//                     theme="snow"
//                     modules={modules}
//                     formats={formats}
//                     // formats={formats}
//                 />
//                 <Button onClick={handleSubmit}>submit</Button>
//             </CenteredLayout>
//         </>
//     )
// }

// write.propTypes = {}

// export default write
