
import styles from './Dashboard.module.css'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { useState } from 'react';
import axios from '../../utils/axios';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

const Dashboard = () => {
    const [uploadFiletext, setUploadFileText] = useState("Upload your resume");
    const [loading, setLoading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDesc, setJobDesc] = useState("");

    const [result, setResult] = useState(null);

    const { userInfo } = useContext(AuthContext);

    const handleOnChangeFile = (e) => {
        setResumeFile(e.target.files[0]);
        setUploadFileText(e.target.files[0].name)
    }

    const handleUpload = async () => {
        try {
            if (!resumeFile || !jobDesc) {
                alert('Please upload a resume and enter job description');
                return;
            }
            
            setLoading(true);
            
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('resume', resumeFile);
            formData.append('job_desc', jobDesc);
            formData.append('user', userInfo?.email || 'user@example.com');
            
            // Make API call to backend
            const response = await axios.post('/resume/addResume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            if (response.data && response.data.data) {
                setResult(response.data.data.feedback);
                alert('Analysis completed successfully!');
            } else {
                alert('Analysis completed but no results received');
            }
            
        } catch (error) {
            console.error('Upload error:', error);
            if (error.response) {
                alert(`Upload failed: ${error.response.data.message || 'Server error'}`);
            } else {
                alert('Upload failed. Please check your connection and try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.Dashboard}>
            <div className={styles.DashboardLeft}>
                <div className={styles.DashboardHeader}>
                    <CreditScoreIcon sx={{ fontSize: 40 }} />
                    <h1>Resume Screening Dashboard</h1>
                </div>

                <div className={styles.alertInfo}>
                    <p>Upload your resume and provide a job description to get AI-powered analysis and screening results.</p>
                </div>

                <div className={styles.DashboardUploadResume}>
                    <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleOnChangeFile} 
                        style={{ display: 'none' }} 
                        id="file-upload" 
                    />
                    <label 
                        htmlFor="file-upload" 
                        className={styles.uploadLabel}
                        style={{
                            display: 'inline-block',
                            padding: '12px 24px',
                            backgroundColor: '#ff6b35',
                            color: 'white',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            border: 'none',
                            marginBottom: '20px',
                            transition: 'background-color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#e55a2e'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b35'}
                    >
                        {uploadFiletext}
                    </label>
                </div>

                <div className={styles.jobDesc}>
                    <textarea value={jobDesc} onChange={(e) => { setJobDesc(e.target.value) }} className={styles.textArea} placeholder='Paste Your Job Description' rows={10} cols={50} />
                    <div className={styles.AnalyzeBtn} onClick={handleUpload} >Analyze</div>
                </div>
            </div>

            <div className={styles.DashboardRight}>
                <div className={styles.DashboardRightTopCard}>
                    <div>Analyze With AI</div>

                    <img className={styles.profileImg} src={userInfo?.photoUrl} />

                    <h2>{userInfo?.name}</h2>
                </div>


                {
                    result && <div className={styles.DashboardRightTopCard}>
                        <div>Result</div>

                        <div className={styles.resultContent}>
                            <h3>Analysis Result:</h3>
                            <p>{result}</p>
                        </div>
                        
                    </div>
                }

                {
                    loading && <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
                }


            </div>

        </div>


    )
}

export default WithAuthHOC(Dashboard)