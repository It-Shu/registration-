import React, {useState} from 'react';
import './App.css';
import {useFormik} from "formik";

type FormikErrorsType = {
    clientName?: string,
    email?: string,
    telNumber?: string
}

function App() {

    // подключается библиотека formik для настройки валидации формы регистрации
    const formik = useFormik({
        initialValues: {
            clientName: '',
            email: '',
            telNumber: '',
        },
        validate: (values) => {
            const errors: FormikErrorsType = {};
            if (!values.email) {
                errors.email = 'Введите email'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-ZА-Я]{2,4}$/i.test(values.email)) {
                errors.email = 'Введено не корректное значение'
            }
            if (!values.clientName) {
                errors.clientName = 'Введите Имя'
            } else if (!/^[a-zA-ZА-Я\s-, ]+$/i.test(values.clientName)) {
                errors.clientName = "Введено не корректное значение"
            }
            if (!values.telNumber) {
                errors.telNumber = 'Введите номер телефона'
            } else if (!/^([\\+]?[1-9][\\(]?[0-9]{3}[\\)]?([0-9]{3}[\\-]?[0-9]{2}[-]?[0-9]{2}$))/i.test(values.telNumber)) {
                errors.telNumber = "Введите корректный номер"
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
        }
    })

    // локальный стейт для checkbox
    const [state, setState] = useState(true)


    const disabledButton = () => {
        return !(formik.values.clientName && formik.values.email && formik.values.telNumber && state);
    }


    return (
        <div>
            <form className='form' onSubmit={formik.handleSubmit}>
                <h1 className='h1'>Регистрация</h1>
                <h4 className='h4'>Уже есть аккаунт? <a className='link' href="">Войти</a></h4>
                <div>
                    <div>
                        <label className='label'>Имя</label>
                    </div>
                    <input
                        className='input'
                        type="text"
                        placeholder='Введите Ваше имя'
                        {...formik.getFieldProps('clientName')}
                    />
                    {
                        formik.touched.clientName
                        && formik.errors.clientName
                        && <div style={{color: 'red'}}>{formik.errors.clientName}</div>
                    }
                </div>
                <div>
                    <div>
                        <label className='label'>Email</label>
                    </div>
                    <input
                        className='input'
                        type="email"
                        placeholder='Введите ваше email'
                        {...formik.getFieldProps('email')}
                    />
                    {
                        formik.touched.email
                        && formik.errors.email
                        && <div style={{color: 'red'}}>{formik.errors.email}</div>
                    }
                </div>
                <div>
                    <div>
                        <label className='label'>Номер</label>
                    </div>
                    <input
                        className='input'
                        type="tel"
                        placeholder="Введите номер телефона"
                        {...formik.getFieldProps('telNumber')}
                    />
                    {
                        formik.touched.telNumber
                        && formik.errors.telNumber
                        && <div style={{color: 'red'}}>{formik.errors.telNumber}</div>
                    }
                </div>

                <div>
                    <div>
                        <label>Язык</label>
                    </div>
                    <select>
                        <option value="/rus/">Русский</option>
                        <option value="/en/">Английский</option>
                        <option value="/ch/">Китайский</option>
                        <option value="/sp/">Испанский</option>
                    </select>
                </div>
                <div>
                    <input
                        className='checkbox'
                        type="checkbox"
                        onClick={(e) => {
                            setState(e.currentTarget.checked)
                        }}
                    /><label className='label'>Принимаю <a className='link' href="">условия</a> пользования</label>
                </div>
                <div>
                    <button
                        className='button'
                        type='button'
                        disabled={disabledButton()}
                    >Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
}

export default App;
