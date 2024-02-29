import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { toast, ToastContainer } from 'react-toastify';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { UploadedDocument } from './components/UploadedDocuments/UploadedDocuments';
import { UploaderDocuments } from '../UploaderDocuments/UploaderDocuments';
import 'react-toastify/dist/ReactToastify.css';

export const UploadingMailingPayslipsContent = observer(({
  onSubmit = () => {},
}: {
  onSubmit?: () => void
}) => {
  const documentsState = useContext(AllDocumentsStateContext);

  const uploadedDocumentsIsEmpty = documentsState.allUploadedDocuments.length === 0;
  const notValidDocumentsIsEmpty = documentsState.allNotValidDocuments.length === 0;

  return (
    <section
      className="uploading-payslips-content"
      data-cy="uploading-payslips-content"
    >
      <div
        className="uploading-payslips-content__header"
        data-cy="uploading-payslips-content-header"
      >
        <Button
          className="uploading-payslips-content__button"
          data-cy="uploading-payslips-content-button"
          disabled={!notValidDocumentsIsEmpty || documentsState.isSent ? true : uploadedDocumentsIsEmpty}
          onClick={() => {
            toast.info(
              'Sending payslips',
              {
                autoClose: 10000,
                onOpen: () => documentsState.setIsSent(true),
                onClose: handleCloseToast,
                closeButton: closeToastButton,
                draggable: false,
              },
            );
          }}
        >
          Send
        </Button>
        <UploaderDocuments />
      </div>
      <ToastContainer
        position="top-center"
        closeOnClick={false}
      />
      {!uploadedDocumentsIsEmpty
       && (
         <ul
           className="uploading-payslips-content__list"
           data-cy="uploading-payslips-content-list"
         >
           {documentsState.allUploadedDocuments.map(({ id, file }) => (
             <li
               key={id}
               className="uploading-payslips-content__item"
               data-cy="uploading-payslips-content-item"
             >
               <UploadedDocument
                 fileId={id}
                 file={file}
                 addNotValidDocuments={() => documentsState.addNotValidDocumentsId(id)}
               />
             </li>
           ))}
         </ul>
       )}
    </section>
  );

  function closeToastButton() {
    return (
      <button
        data-cy="toast-close-button"
        type="button"
        onClick={() => {
          documentsState.setIsSent(false);
          toast.dismiss();
        }}
      >
        Cancel
      </button>
    );
  }

  function handleCloseToast() {
    if (documentsState.isSent) {
      onSubmit();
    }
  }
});
