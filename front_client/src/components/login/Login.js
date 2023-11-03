import React, { Fragment, useRef, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CkeckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import klee from '../../assests/klee_icon.png';
const required = (value) => {
  if (!value) {
    return (
      <div className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10" role="alert">
        Bạn cần nhập thông tin này!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* HEADER ĐĂNG NHẬP */}
        <div className="">
          <img
            className="mx-auto w-36 p-0"
            src={klee}
            alt="WIBU APP"
          />
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
            Đăng nhập
          </h2>
        </div>
        {/* FORM ĐĂNG NHẬP */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" action="#" method="POST" onSubmit={handleLogin} ref={form}>
            {/* TÊN ĐĂNG NHẬP */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-red-500">
                Tên đăng nhập
              </label>
              <div className="mt-2">
                <Input
                  id="username"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                  className="block w-full rounded-md border-0 py-1.5 text-red-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* MẬT KHẨU */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-red-500">
                  Mật khẩu
                </label>
                <div className="text-sm">
                  <a href="/register" className="font-semibold text-red-600 hover:text-red-500">
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                  className="block w-full rounded-md border-0 py-1.5 text-red-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* BUTTON ĐĂNG NHẬP */}
            <div>
              <button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >{loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
                Đăng nhập
              </button>
            </div>
            {/* THÔNG BÁO */}
            {message && (
              <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                              </div>
                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-red-500">
                                  THÔNG BÁO
                                </Dialog.Title>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Tên đăng nhập hoặc mật khẩu chưa chính xác <hr/>
                                    {message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                              onClick={() => setOpen(false)}
                            >
                              Đóng
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Đăng ký
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            )}
            {/* NÚT KIỂM TRA */}
            <CkeckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
          {/* ĐĂNG KÍ */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Chưa có tài khoản?{' '}
            <a href="/register" className="font-semibold leading-6 text-red-600 hover:text-red-500">
              Đăng kí ngay
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;