import React, { useState, useEffect } from 'react'
import styles from './Admin.module.css';
import { Skeleton } from '@mui/material';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios';


const Admin = () => {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {

    const fetchAllData = async () => {
      try {
        setLoader(true);
        // Please watch the video for full code
        // TODO: Implement API call to fetch all user data
        console.log('Fetching all admin data');
        // Simulated data for now
        setTimeout(() => {
          setData([]);
          setLoader(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setLoader(false);
      }
    }

    fetchAllData()
  }, [])

  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBlock}>

        {
          loader && <>
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: "20px" }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: "20px" }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={400}
              sx={{ borderRadius: "20px" }}
            />
          </>
        }

        {data.length > 0 && 
          data.map((item, index) => (
            <div key={index} className={styles.AdminCard}>
              <h3>Admin Item {index + 1}</h3>
              <p>Data: {JSON.stringify(item)}</p>
            </div>
          ))
        }


      </div>
    </div>
  )
}

export default WithAuthHOC(Admin);