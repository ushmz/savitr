import { MDBBtn, MDBCloseIcon, MDBCol, MDBContainer, MDBProgress, MDBRow } from 'mdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

export const Upload: React.FC = () => {
  const history = useHistory();
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone();

  // eslint-disable-next-line react/jsx-key
  const files = acceptedFiles.map((file, idx) => {
    return (
      <div key={idx} className="border border-dark rounded-lg mx-3" style={{ width: '600px' }}>
        <MDBRow>
          {/* <MDBProgress value={0} className="my-2" /> */}
          <MDBCol>
            <input className="mx-4 my-1" defaultValue={file.name} />
          </MDBCol>
          <MDBCol>
            <p className="mx-4 my-1">{`${file.size} bytes`}</p>
          </MDBCol>
          <MDBCol>
            <span className="float-md-right">
              <MDBCloseIcon onClick={() => acceptedFiles.splice(idx, 1)} />
            </span>
          </MDBCol>
        </MDBRow>
      </div>
    );
  });

  return (
    <MDBContainer>
      <p>User Home</p>
      <p>実験協力ありがとうございます。こちらから履歴情報のアップロードを行ってください。</p>
      <p>いただいた履歴情報は研究目的以外の用途で使用することはありません。</p>
      <MDBRow className="border border-dark rounded-lg p-3">
        {files.length !== 0 ? <div className="my-2">{files}</div> : <></>}
        {/* <div className="input-group-prepend">
              <span className="input-group-text">ファイルを選択</span>
            </div> */}
        <div {...getRootProps({ className: 'custom-file' })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="custom-file-label">ここにファイルをドラッグ&ドロップ。</p>
          ) : (
            <p className="custom-file-label">ファイルを選択するか、ドラッグ&ドロップしてください。</p>
          )}
        </div>
      </MDBRow>
      <MDBRow>
        <MDBBtn color="primary" onClick={() => history.goBack()}>
          User Home
        </MDBBtn>
      </MDBRow>
    </MDBContainer>
  );
};
