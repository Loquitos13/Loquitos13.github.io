<!DOCTYPE html>
<html lang="pt">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Print & Go</title>
<link rel="stylesheet" href="css/SignIn.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="js/SignIn.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
</head>

<body style="background-color: #EEF2FF;">

</body>
<div class="modal modal-sheet position-static d-block  p-4 py-md-5" tabindex="-1" role="dialog" id="modalSignin">
    <div class="modal-dialog" role="document">
        <div class="modal-content rounded-4 shadow">
            <!-- Este é o cabeçalho do modal -->
            <div class=" p-5 pb-4 border-bottom-0">
                <h1 class="fw-bold mb-0 fs-2 text-center text-custom-color">Print&Go</h1>
                <h4 class="fw-bold mb-0 fs-4 text-center text-welcome">Create Account</h4>
                <p class=" mb-0 text-center">Join Print&Go today</p>
            </div>

            <div class="modal-body p-5 pt-0">
                <form class="">
                    <!-- div para colocar o First name e Last Name na mesma linha -->
                    <div class="row">
                        <!-- Divide a lnha ao meio-->
                        <div class="col-md-6">
                            <h6>First Name</h6>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control rounded-3" id="floatingInput"
                                    placeholder="name@example.com">
                                <label for="floatingInput">First Name</label>
                            </div>
                        </div>
                        <!-- Divide a lnha ao meio-->
                        <div class="col-md-6">
                            <h6>Last Name</h6>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control rounded-3" id="floatingInput"
                                    placeholder="name@example.com">
                                <label for="floatingInput">Last Name</label>
                            </div>
                        </div>
                    </div>
                    <!-- Email -->
                    <h6>Email</h6>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control rounded-3" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">Enter your email</label>
                    </div>
                    <!-- Password -->
                    <h6>Password</h6>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control rounded-3" id="floatingPassword"
                            placeholder="Password">
                        <label for="floatingPassword">Create a password</label>
                    </div>
                    <!-- Confirm Password -->
                    <h6>Confirm Password</h6>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control rounded-3" id="floatingPassword"
                            placeholder="Password">
                        <label for="floatingPassword">Confirm your password</label>
                    </div>
                    
                    <!-- Butão Create Account -->
                    <button class="w-100 mb-2 btn btn-lg rounded-3" id="btnSignUp" type="submit">Create Account</button>
                    <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
                    <hr class="my-4">
                    <h2 class="fs-5 fw-bold mb-3">Or use a third-party</h2>
                    
                    <!-- Butão para criar conta com Facebook -->
                    <button
                        class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3 d-flex align-items-center justify-content-center"
                        type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-facebook" viewBox="0 0 16 16">
                            <path
                                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                        </svg>
                        <span class="ms-2">Sign in with Facebook</span>
                    </button>

                    <!-- Butão para criar conta com Google -->
                    <button
                        class="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3 d-flex align-items-center justify-content-center"
                        type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-google" viewBox="0 0 16 16">
                            <path
                                d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                        <span class="ms-2">Sign up with Google</span>
                    </button>

                    <!-- Link para a página de Sign In -->
                    <div class="d-flex mt-4 justify-content-center">
                        <h6>Already have an account?</h6>
                        &nbsp;
                        <a id="SingLink" class="link-offset-1" href="SignIn.php">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</html>