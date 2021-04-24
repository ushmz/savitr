import { MDBBtn, MDBIcon, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Header } from 'Components/Header';
import { uploadUserFile } from 'shared/apis/apis';
import { useAuth } from 'shared/provider/authProvider';
import { toast } from 'react-toastify';

export const Upload: React.FC = () => {
  const history = useHistory();
  const auth = useAuth();
  const [uploaded, setUploaded] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length != 1) {
        toast.error('アップロードできるファイルは1つのみです。');
        return setUploaded([...uploaded]);
      }
      return setUploaded([...acceptedFiles]);
    },
    [uploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDrop, multiple: false });

  const removeFile = (file: File) => () => {
    const newFiles = [...uploaded];
    newFiles.splice(newFiles.indexOf(file), 1);
    setUploaded(newFiles);
  };

  // const removeAll = () => {
  //   setUploaded([]);
  // };

  // const handleFileChange = (e: any) => {
  //   const target = e.target as HTMLInputElement;

  //   if (target.files == null) return;
  //   const file = target.files.item(0);
  //   if (file) {
  //     uploaded[0] = file;
  //   } else {
  //     return;
  //   }
  // };

  const onSubmit = async (): Promise<boolean> => {
    if (uploaded[0]) {
      const username = auth.user?.email?.split('@')[0] || '';
      const isOk = await uploadUserFile(username, uploaded[0]);
      return isOk;
    }
    return false;
  };

  const files = uploaded.map((file, idx) => {
    return (
      <div key={idx} className="border border-dark rounded-lg mx-3 my-1 px-3">
        <MDBRow>
          <MDBCol md="10">
            <div className="d-flex flex-row">
              <input className="my-1" id={`fileInput${idx}`} defaultValue={file.name} />
              <p className="my-1">{`(${file.size} bytes)`}</p>
            </div>
          </MDBCol>
          <MDBCol md="2">
            <span className="float-right">
              <MDBIcon icon="times-circle" onClick={removeFile(file)} />
            </span>
          </MDBCol>
        </MDBRow>
      </div>
    );
  });

  return (
    <>
      <Header />
      <MDBContainer className="my-5">
        <h3>履歴情報のエクスポート方法について</h3>
        <p>実験協力ありがとうございます。こちらから履歴情報のアップロードを行ってください。</p>
        <p>いただいた履歴情報は研究目的以外の用途で使用することはありません。</p>

        <p>
          chrome 拡張が使用できるブラウザでは、閲覧履歴データをエクスポートする拡張機能を使用できます。
          <br />
          詳細な手順については、
          <Link to="/how2exporthistory/ext">chrome 拡張を用いた閲覧履歴データのエクスポート方法</Link>
          をご覧ください。
        </p>

        <MDBRow className="border border-dark rounded-lg p-3">
          {files.length !== 0 ? <div style={{ width: '100%' }}>{files}</div> : <></>}
          {/* <div className="input-group-prepend">
              <span className="input-group-text">ファイルを選択</span>
            </div> */}
          <div {...getRootProps({ className: 'custom-file my-3' })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="custom-file-label">ここにファイルをドラッグ & ドロップ。</p>
            ) : (
              <p className="custom-file-label">ファイルを選択するか、ドラッグ & ドロップしてください。</p>
            )}
          </div>
        </MDBRow>
        <MDBRow className="my-3">
          <MDBBtn
            color="primary"
            type="submit"
            onClick={async () => {
              const isOk = await onSubmit();
              if (isOk) {
                history.push('/upload/completion');
              } else {
                toast.error('アップロードに失敗しました。');
              }
            }}
          >
            アップロードする
          </MDBBtn>
        </MDBRow>
      </MDBContainer>
    </>
  );
};
