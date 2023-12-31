import { Amplify } from 'aws-amplify'
import { uploadData, list, getProperties, getUrl } from 'aws-amplify/storage';
import React, { useEffect, useRef, useState } from 'react'
import amplifyconfig from '../amplifyconfiguration.json'

const UploadFile = () => {
    const refInput = useRef(null)
    const [files,setFile] = useState([])
    Amplify.configure(amplifyconfig)

    const handleFileLoad = async () => {
        const fileName = refInput.current.files[0].name
        console.log(fileName);

        try {
            const result = await uploadData({
                key: fileName,
                data: refInput.current.files[0],
            }).result;
            console.log('Succeeded: ', result);
        } catch (error) {
            console.log('Error : ', error);
        }
    }

    useEffect(async () => {
        try {
            const result = await list()
            console.log(result.items);
            setFile(result.items)
        } catch (error) {
            console.log(error);
        }

        // Amplify.configure({
        //     Auth: {
        //         identityPoolId: 'ap-southeast-2:07723d35-957f-4279-9ee6-11043f5c2ccd',
        //         region: 'ap-southeast-2'
        //     },
        //     // Storage: {
        //     //     bucket: 'react-bucket-iu-demo', //REQUIRED -  Amazon S3 bucket
        //     // }
        //     Storage: {
        //         bucket: 'react-bucket-iu'
        //     }
        // })
    }, [])

    const handleShow = async (file) => {
        console.log(file);
        try {
            const result = await getUrl({
              key: file
            });
            console.log('Result when click download ', result);
          } catch (error) {
            console.log('Error ', error);
          }
    }
    return (
        <>
            <h1>React AWS Storage Demo</h1>
            <input type="file" ref={refInput} onChange={handleFileLoad} />
            {
                files.length <= 0 ? (<></>) : (
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td>Name</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                files.map((item,index) => {
                                    return (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{item.key}</td>
                                            <td>
                                                <button onClick={() => handleShow(item.key)}>download</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </>
    )
}

export default UploadFile