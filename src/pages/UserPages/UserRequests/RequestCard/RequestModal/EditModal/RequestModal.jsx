import React, { useContext, useState } from 'react';
import moment from 'moment';
import styles from './RequestModal.module.css';
import Modal from 'react-modal';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react-lite';
import { editRequest } from '../../../../../../http/requestApi';
import Button from '../../../../../../components/shared/Button/Button';
import FilesField from '../../../../../../components/shared/Forms/FilesField/FilesField';
import TextAreaField from '../../../../../../components/shared/Forms/TextAreaField/TextAreaField';
import SelectField from '../../../../../../components/shared/Forms/SelectField/SelectField';
import { REQUEST_DISTRICTS, REQUEST_TOPICS, REQUEST_TYPES } from '../../../../../../utils/constants';
import { Context } from '../../../../../..';
import DeleteModal from '../DeleteModal/DeleteModal';

const RequestModal = ({modalIsOpen, closeModal, requestData}) => {

  Modal.setAppElement('#root');
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    content: {
      top: '50%',
      minWidth: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '1rem',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const openDeleteModal = () => setDeleteIsOpen(true);
  const closeDeleteModal = () => setDeleteIsOpen(false);

  const {userStore} = useContext(Context);

  return ( 
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      >
      <Formik
        initialValues={{
          text: requestData.text ??  '',
          district: requestData.district ??  '',
          topic: requestData.topic ??  '',
          type: requestData.type ??  '',
          files: requestData.files ??  '',
        }}
        validationSchema={RequestSchema}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={(values) => {
          const request = new FormData();
          request.append("district", values.district);
          request.append("topic", values.topic);
          request.append("type", values.type);
          request.append("text", values.text);
          for (let i = 0; i < values.files.length; i++) {
            request.append("files", values.files[i]);
          }
          editRequest(request, requestData.id).then((data) => {
            closeModal()
          })
        }}
      >
        {(formik) => (
          <Form className={styles.form_modal}>
            <SelectField
              name='district'
              onChange={option => formik.setFieldValue('district', option.value)}
              value={formik.values.district}
              options={REQUEST_DISTRICTS}
              label="Выберите район"
              placeholder="Выберите район"
              />
            <SelectField
              name='topic'
              onChange={option => formik.setFieldValue('topic', option.value)}
              value={formik.values.topic}
              options={REQUEST_TOPICS}
              label="Выберите сферу обращения"
              placeholder="Выберите сферу обращения"
              />
            <SelectField
              name='type'
              onChange={option => formik.setFieldValue('type', option.value)}
              value={formik.values.type}
              options={REQUEST_TYPES}
              label="Выберите тип обращения"
              placeholder="Выберите тип обращения"
              />
            <TextAreaField 
              name='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
              type='textarea'
              label='Введите текст обращения'
              placeholder='Введите текст обращения'
            />
            <FilesField
              id="files"
              name="files"
              type="file"
              label="Прикрепить файлы"
              onChange={(event) => {
                const files = event.target.files;
                let myFiles = Array.from(files);
                formik.setFieldValue("files", myFiles);
              }}
              multiple
            />
            <div className={styles.button_row}>
              <Button 
                type='button'
                onClick={closeModal}
                className='secondary-outline'
              >Закрыть</Button>
              <Button
                type='submit'
                className='primary'
              >Отправить</Button>
            </div>
            <div className={styles.button_row}>
              <Button 
                type='button'
                onClick={openDeleteModal}
                className='secondary-outline'
              >Удалить</Button>
              <DeleteModal userId={userStore.User.id} reqId={requestData.id} modalIsOpen={deleteIsOpen} closeModal={closeDeleteModal} closeNextModal={closeModal}/>
            </div>
          </Form>
          )}
        </Formik>
      </Modal>
  );
}
 
export default observer(RequestModal);

const RequestSchema = Yup.object().shape({
  district: Yup.string(),
  topic: Yup.string(),
  type: Yup.string(),
  text: Yup.string()
  .required('Введите текст обращения')
  .min(20, 'Текст обращения должен содержать не менее 20 символов'),
  files: Yup.mixed()
  .nullable()
  .notRequired()
  // .test("FILE_SIZE", "Uploaded file is too big.", 
  //     value => !value || (value && value.size <= FILE_SIZE))
  // .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
  //     value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
});