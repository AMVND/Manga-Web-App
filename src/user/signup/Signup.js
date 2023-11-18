import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { GOOGLE_AUTH_URL } from '../../constants/index';
import { signup } from '../../util/APIUtils';
import googleLogo from '../../assests/img/google-logo.png';

export class Signup extends Component {
    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }} />;
        }

        return (
            <div className="container flex flex-col mx-auto bg-white rounded-lg my-5">
                <div className="flex justify-center">
                    <div className="flex items-center justify-center w-full">
                        <div className="flex items-center">
                            {/* FORM ĐĂNG KÝ */}
                            <SignupForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class SocialSignup extends Component {
    render() {
        return (
            <div>
                <a className="flex items-center justify-center py-4 lg:px-28 sm:px-0 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300" href={GOOGLE_AUTH_URL}>
                    <img className="h-5" src={googleLogo} alt="Google" />
                    Đăng ký bằng Google
                </a>
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
            .then(response => {
                // Alert.success("You're successfully registered. Please login to continue!");
                this.props.history.push("/login");
            }).catch(error => {
                // Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
            });
    }

    render() {
        return (
            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" >
                <h3 className="mb-3 text-2xl font-extrabold text-dark-grey-900">Đăng ký</h3>
                <SocialSignup />
                <div className="flex items-center mb-3">
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                    <p className="mx-4 text-grey-600">HOẶC</p>
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label htmlFor="name" className="mb-2 text-sm text-start text-grey-900">Họ và tên</label>
                <input id="name" type="text" name="name" placeholder="full name"
                    value={this.state.name} onChange={this.handleInputChange}
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email</label>
                <input id="email" type="email" placeholder="mail@gmail.com" name='email'
                    value={this.state.email} onChange={this.handleInputChange}
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Mật khẩu</label>
                <input id="password" type="password" placeholder="Nhập mật khẩu" name='password'
                    value={this.state.password} onChange={this.handleInputChange}
                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <button onClick={this.handleSubmit} className="w-full px-6 py-5 mb-0 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">Đăng ký</button>
                <p className="lg:mt-10 sm:mt-2 text-center text-sm text-gray-500">
                    Đã có tài khoản?{' '}
                    <a href="/login" className="font-semibold leading-6 text-purple-blue-600 hover:text-purple-blue-500">
                        Đăng nhập ngay
                    </a>
                </p>
            </form>
        );
    }
}

export default Signup