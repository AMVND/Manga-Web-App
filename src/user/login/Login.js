import React, { Component } from 'react';
import { GOOGLE_AUTH_URL, ACCESS_TOKEN } from '../../constants/index';
import { login } from '../../util/APIUtils';
import { Redirect } from 'react-router-dom'
import googleLogo from '../../assests/img/google-logo.png';
import LoginMangaDex from './LoginMangaDex';


export class Login extends Component {
    componentDidMount() {

        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if (this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                // alert.error(this.props.location.state.error, {
                //     timeout: 5000
                // });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {
        if (this.props.authenticated) {
            window.location.reload();
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }} />;
        }

        return (
            <div className="container flex flex-col mx-auto bg-white rounded-lg my-5 pt-10">
                <div className="flex justify-center">
                    <div className="flex items-center justify-center w-full">
                        <div className="flex items-center">
                            <LoginForm {...this.props} />
                            {/* ĐĂNG KÍ */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class SocialLogin extends Component {

    handleLoginMangaDex = () => {
        // Redirect the user to the MangaDex authorization endpoint
        window.location.href = 'https://api.mangadex.org/auth/login';
    }

    render() {
        return (
            <div>
                <a className="flex items-center justify-center py-4 lg:px-28 sm:px-0 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300" href={GOOGLE_AUTH_URL}>
                    <img className="h-5" src={googleLogo} alt="Google" />
                    Đăng nhập bằng Google
                </a>
                <LoginMangaDex/>
            </div>
        );
    }
}



class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
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
        const loginRequest = Object.assign({}, this.state);
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                // alert.success("You're successfully logged in!");
                this.props.history.push("/");
                window.location.reload();
            }).catch(error => {
                // alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    }

    // FORM
    render() {
        return (
            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" >
                <h3 className="mb-3 text-2xl font-extrabold text-dark-grey-900">Đăng nhập</h3>
                <SocialLogin />
                <div className="flex items-center mb-3">
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                    <p className="mx-4 text-grey-600">HOẶC</p>
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email</label>
                <input id="email" type="email" placeholder="mail@gmail.com" name='email'
                    value={this.state.email} onChange={this.handleInputChange}
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Mật khẩu</label>
                <input id="password" type="password" placeholder="Nhập mật khẩu" name='password'
                    value={this.state.password} onChange={this.handleInputChange}
                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <div className="flex flex-row justify-between mb-8">
                    <a href="/" className="mr-4 text-sm font-medium text-purple-blue-500">Quên mật khẩu?</a>
                </div>
                <button onClick={this.handleSubmit} className="w-full px-6 py-5 mb-0 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">Đăng nhập</button>
                <p className="lg:mt-10 sm:mt-2 text-center text-sm text-gray-500">
                    Chưa có tài khoản?{' '}
                    <a href="/signup" className="font-semibold leading-6 text-purple-blue-600 hover:text-purple-blue-500">
                        Đăng kí ngay
                    </a>
                </p>
            </form>
        );
    }
}

export default Login