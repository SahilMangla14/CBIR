import React from 'react'
import './ImageUpload.css'
// import axios from 'axios'


const ImageUpload = () => {
    
    const data=new FormData();

    window.addEventListener("DOMContentLoaded", () => {
        const upload = new UploadmyModal("#upload");
    });
    
    class UploadmyModal {
        filename = "";
        isCopying = false;
        isUploading = false;
        progress = 0;
        progressTimeout = null;
        state = 0;
        
        constructor(el) {
            this.el = document.querySelector(el);
            this.el?.addEventListener("click", this.action.bind(this));
            this.el?.querySelector("#file")?.addEventListener("change", this.fileHandle.bind(this));
        }
        action(e) {
            this[e.target?.getAttribute("data-action")]?.();
            this.stateDisplay();
        }
        cancel() {
            this.isUploading = false;
            this.progress = 0;
            this.progressTimeout = null;
            this.state = 0;
            this.stateDisplay();
            this.progressDisplay();
            this.fileReset();
        }
        async copy() {
            const copyButton = this.el?.querySelector("[data-action='copy']");

            if (!this.isCopying && copyButton) {
                // disable
                this.isCopying = true;
                copyButton.style.width = `${copyButton.offsetWidth}px`;
                copyButton.disabled = true;
                copyButton.textContent = "Copied!";
                navigator.clipboard.writeText(this.filename);
                await new Promise(res => setTimeout(res, 1000));
                // reenable
                this.isCopying = false;
                copyButton.removeAttribute("style");
                copyButton.disabled = false;
                copyButton.textContent = "Copy Link";
            }
        }
        fail() {
            this.isUploading = false;
            this.progress = 0;
            this.progressTimeout = null;
            this.state = 2;
            this.stateDisplay();
        }
        file() {
            this.el?.querySelector("#file").click();
        }
        fileDisplay(name = "") {
            // update the name
            this.filename = name;

            const fileValue = this.el?.querySelector("[data-file]");
            if (fileValue) fileValue.textContent = this.filename;

            // show the file
            this.el?.setAttribute("data-ready", this.filename ? "true" : "false");
        }
        fileHandle(e) {
            return new Promise(() => {
                const { target } = e;
                if (target?.files.length) {
                    let reader = new FileReader();
                    reader.onload = e2 => {
                        this.fileDisplay(target.files[0].name);
                    };
                    reader.readAsDataURL(target.files[0]);
                    data.append("files", target.files[0]);
                    
                    // console.log(...data);
                    // console.log(URL.createObjectURL(target.files[0]));
                    // console.log(target.files[0].name)
                }
            });
        }
        fileReset() {
            const fileField = this.el?.querySelector("#file");
            if (fileField) fileField.value = null;

            this.fileDisplay();
        }
        progressDisplay() {
            const progressValue = this.el?.querySelector("[data-progress-value]");
            const progressFill = this.el?.querySelector("[data-progress-fill]");
            const progressTimes100 = Math.floor(this.progress * 100);

            if (progressValue) progressValue.textContent = `${progressTimes100}%`;
            if (progressFill) progressFill.style.transform = `translateX(${progressTimes100}%)`;
        }
        async progressLoop() {
            this.progressDisplay();

            if (this.isUploading) {
                if (this.progress === 0) {
                    await new Promise(res => setTimeout(res, 1000));
                    // fail randomly
                    if (!this.isUploading) {
                        return;
                    } else if (Utils.randomInt(0, 2) === 0) {
                        this.fail();
                        return;
                    }
                }
                // …or continue with progress
                if (this.progress < 1) {
                    this.progress += 0.01;
                    this.progressTimeout = setTimeout(this.progressLoop.bind(this), 50);
                } else if (this.progress >= 1) {
                    this.progressTimeout = setTimeout(() => {
                        if (this.isUploading) {
                            this.success();
                            this.stateDisplay();
                            this.progressTimeout = null;
                        }
                    }, 250);
                }
            }
        }
        stateDisplay() {
            this.el?.setAttribute("data-state", `${this.state}`);
        }
        success() {
            this.isUploading = false;
            this.state = 3;
            this.stateDisplay();
        }
        upload() {
            if (!this.isUploading) {
                this.isUploading = true;
                this.progress = 0;
                this.state = 1;
                this.progressLoop();
                fetch('http://localhost:5000/query',{
                    method: 'POST',
                    body: data,
                    mode: 'cors'
                }).then((res)=>res.json).then((res)=>console.log(res))
            }
        }

        
    }

    class Utils {
        static randomInt(min = 0, max = 2 ** 32) {
            const percent = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
            const relativeValue = (max - min) * percent;

            return Math.round(min + relativeValue);
        }
    }

    return (
        <div className='complete'>
            <div className="complete-left">
                Query Image
            </div>

            <div className="complete-right">
                <div id="upload" className="myModal" data-state={0} data-ready="false">
                    <div className="myModal__header">
                        <button className="myModal__close-button" type="button">
                            <svg
                                className="myModal__close-icon"
                                viewBox="0 0 16 16"
                                width="16px"
                                height="16px"
                                aria-hidden="true"
                            >
                                <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                >
                                    <polyline points="1,1 15,15" />
                                    <polyline points="15,1 1,15" />
                                </g>
                            </svg>
                            <span className="myModal__sr">Close</span>
                        </button>
                    </div>
                    <div className="myModal__body">
                        <div className="myModal__col">
                            {/* up */}
                            <svg
                                className="myModal__icon myModal__icon--blue"
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px"
                                aria-hidden="true"
                            >
                                <g
                                    fill="none"
                                    stroke="hsl(223,90%,50%)"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle
                                        className="myModal__icon-sdo69"
                                        cx={12}
                                        cy={12}
                                        r={11}
                                        strokeDasharray="69.12 69.12"
                                    />
                                    <polyline
                                        className="myModal__icon-sdo14"
                                        points="7 12 12 7 17 12"
                                        strokeDasharray="14.2 14.2"
                                    />
                                    <line
                                        className="myModal__icon-sdo10"
                                        x1={12}
                                        y1={7}
                                        x2={12}
                                        y2={17}
                                        strokeDasharray="10 10"
                                    />
                                </g>
                            </svg>
                            {/* error */}
                            <svg
                                className="myModal__icon myModal__icon--red"
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px"
                                aria-hidden="true"
                                display="none"
                            >
                                <g
                                    fill="none"
                                    stroke="hsl(3,90%,50%)"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                >
                                    <circle
                                        className="myModal__icon-sdo69"
                                        cx={12}
                                        cy={12}
                                        r={11}
                                        strokeDasharray="69.12 69.12"
                                    />
                                    <line
                                        className="myModal__icon-sdo14"
                                        x1={7}
                                        y1={7}
                                        x2={17}
                                        y2={17}
                                        strokeDasharray="14.2 14.2"
                                    />
                                    <line
                                        className="myModal__icon-sdo14"
                                        x1={17}
                                        y1={7}
                                        x2={7}
                                        y2={17}
                                        strokeDasharray="14.2 14.2"
                                    />
                                </g>
                            </svg>
                            {/* check */}
                            <svg
                                className="myModal__icon myModal__icon--green"
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px"
                                aria-hidden="true"
                                display="none"
                            >
                                <g
                                    fill="none"
                                    stroke="hsl(138,90%,50%)"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle
                                        className="myModal__icon-sdo69"
                                        cx={12}
                                        cy={12}
                                        r={11}
                                        strokeDasharray="69.12 69.12"
                                    />
                                    <polyline
                                        className="myModal__icon-sdo14"
                                        points="7 12.5 10 15.5 17 8.5"
                                        strokeDasharray="14.2 14.2"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div className="myModal__col">
                            <div className="myModal__content">
                                <h2 className="myModal__title">Upload a File</h2>
                                <p className="myModal__message">
                                    Select a file to upload from your computer or device.
                                </p>
                                <div className="myModal__actions">
                                    {/* <button
                                        className="myModal__button myModal__button--upload"
                                        type="button"
                                        data-action="file"
                                    >
                                        choose file
                                    </button> */}
                                    <input id="file" type="file" hidden="" className="myModal__button myModal__button--upload"/>
                                </div>
                                <div className="myModal__actions" hidden="">
                                    <svg
                                        className="myModal__file-icon"
                                        viewBox="0 0 24 24"
                                        width="24px"
                                        height="24px"
                                        aria-hidden="true"
                                    >
                                        <g
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polygon points="4 1 12 1 20 8 20 23 4 23" />
                                            <polyline points="12 1 12 8 20 8" />
                                        </g>
                                    </svg>
                                    <div className="myModal__file" data-file="" />
                                    <button
                                        className="myModal__close-button"
                                        type="button"
                                        data-action="fileReset"
                                    >
                                        <svg
                                            className="myModal__close-icon"
                                            viewBox="0 0 16 16"
                                            width="16px"
                                            height="16px"
                                            aria-hidden="true"
                                        >
                                            <g
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                            >
                                                <polyline points="4,4 12,12" />
                                                <polyline points="12,4 4,12" />
                                            </g>
                                        </svg>
                                        <span className="myModal__sr">Remove</span>
                                    </button>
                                    <button
                                        className="myModal__button"
                                        type="button"
                                        data-action="upload"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                            <div className="myModal__content" hidden="">
                                <h2 className="myModal__title">Uploading…</h2>
                                <p className="myModal__message">
                                    Just give us a moment to process your file.
                                </p>
                                <div className="myModal__actions">
                                    <div className="myModal__progress">
                                        <div className="myModal__progress-value" data-progress-value="">
                                            0%
                                        </div>
                                        <div className="myModal__progress-bar">
                                            <div className="myModal__progress-fill" data-progress-fill="" />
                                        </div>
                                    </div>
                                    <button
                                        className="myModal__button"
                                        type="button"
                                        data-action="cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <div className="myModal__content" hidden="">
                                <h2 className="myModal__title">Oops!</h2>
                                <p className="myModal__message">
                                    Your file could not be uploaded due to an error. Try uploading it
                                    again?
                                </p>
                                <div className="myModal__actions myModal__actions--center">
                                    <button
                                        className="myModal__button"
                                        type="button"
                                        data-action="upload"
                                    >
                                        Retry
                                    </button>
                                    <button
                                        className="myModal__button"
                                        type="button"
                                        data-action="cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <div className="myModal__content" hidden="">
                                <h2 className="myModal__title">Upload Successful!</h2>
                                <p className="myModal__message">
                                    Your file has been uploaded. You can copy the link to your clipboard.
                                </p>
                                <div className="myModal__actions myModal__actions--center">
                                    <button className="myModal__button" type="button" data-action="copy">
                                        Copy Link
                                    </button>
                                    <button
                                        className="myModal__button"
                                        type="button"
                                        data-action="cancel"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ImageUpload
