// src/components/OurTeam.jsx
import React from 'react';
import { useState } from 'react';
import './OurTeam.css';
import { FaLinkedin } from 'react-icons/fa';
import ceo from './ceo.jpg';
import coo from './katoch.jpg';
import cto from './akshat.jpg';
import Dhiyanesh from './Dhiyanesh.jpg';
import Vrisha from './vrisha.jpg';
import Shreya from './shreya.jpg';
import Joshua from './Joshua.jpg';
import Teja from './Teja.jpg';
import Rakesh from './Rakesh.jpg';
import Ishaan from './ishaan.jpg';
import Harshith from './harshith.jpg';
import Latisha from './Latisha.jpg';
import nain from './nain.jpg';
import naina from './naina.jpg';
import sanchita from './sanchita.jpg';
import mrithula from './mrithula.jpg';
import niki from './niki.jpg';
import balaji from './balaji.jpg';
import vaibhav from './vaibhav.jpg';
import garv from './garv.jpg';
import abhi from './abishek.jpg';
import shreyaDas from './shreyaDas.jpg';
import surmai from './surmai.jpg';
import harsha from './harsha.jpg';
import rahul from './rahul.jpg';
import mano from './mano.jpg';
import pratham from './pratham.jpg';
import amulya from './amulya.jpg';
import ml from './ml-final.png';
import dev from './dev-final.png';
import neuro from './neuro-final.png';
import xr from './xr-final.png';
import elec from './elec-final.png';
import mantha from './mantha.jpg';
import aadesh from './aadesh.jpg';
import manasvi from './manasvi.jpg';
import kaustubh from './kaustubh.jpg';
import raj from './raj.jpg';
import noel from './noel.jpg';
import cn2 from './cn2f.png';

const departmentData = [
  {
    name:"The Office",
    members:[
      {
        name: "Ketan Chouhan",
        title: "CEO",
        img: ceo,
        linkedin: "https://www.linkedin.com/in/ketan-chouhan-47020826b/"
      },
      {
        name: "Akshat Jain",
        title: "CTO, Software",
        img: cto,
        linkedin: "https://www.linkedin.com/in/akshat-jain-362262275/"
      },
      {
        name: "Aditya Katoch",
        title: "CTO,Hardware",
        img: coo,
        linkedin: "https://www.linkedin.com/in/aditya-katoch-071b9324a/"
      },
      {
        name: "Shreya Agarwal",
        title: "COO",
        img: Shreya,
        linkedin: "https://www.linkedin.com/in/shreya-agarwal-276bb6276/"
      },
    ]
  },
  {
    name: "Extended Reality",
    image:xr,
    members: [
      {
        name: "Garv Bansal",
        title: "Head of Extended Reality",
        img: garv,
        linkedin: "https://www.linkedin.com/in/garv12bansal/"
      },
      {
        name: "Amulyapreet Kaur",
        title: "XR developer",
        img: amulya
      },
      {
        name:"Kaustubh Shenoy A",
        title:"XR Developer",
        img : kaustubh
      },
    ]
  },
  {
    name: "Cloud & Networking",
    image: cn2,
    members: [
      {
        name: "Harshith B",
        title: "Head of Cloud and Networking",
        img: Harshith,
        linkedin: "https://www.linkedin.com/in/harshith-b-02396627a/"
      },
      {
        name: "Pratham Lal",
        title: "Security Analyst",
        img:pratham,
        linkedin:"http://www.linkedin.com/in/pratham-lal-69597b28a"
      }  
    ]
  },
  {
    name: "Machine Learning",
    image: ml,
    members: [
      {
        name: "Rakesh Prajapati",
        title: "Head of Machine Learning",
        img: Rakesh,
        linkedin: "https://www.linkedin.com/in/rakesh-prajapati-062892248/"
      },
      {
        name: "Ishaan Mishra",
        title: "Senior ML Specialist",
        img: Ishaan,
        linkedin: "https://www.linkedin.com/in/ishaan-mishra-93646b275/"
      },
      {
        name: "Nainika Pathak",
        title: "ML Specialist",
        img: naina,
        linkedin:"https://www.linkedin.com/in/nainika-pathak-270011359/"
      },
    ]
  },
  {
    name: "Development",
    image:dev,
    members: [
      {
        name: "Surmai Gurung",
        title: "Head of Development",
        img: surmai,
        linkedin: "https://www.linkedin.com/in/surmai-gurung-014ba92b8/"
      },
      {
        name: "Rahul Ravikumar",
        title: "Senior Web Developer",
        img:rahul,
        linkedin:"http://www.linkedin.com/in/rahul-ravikumar-677102290"
      },
      {
        name: "Latisha Pinjari",
        title: "App Developer",
        img: Latisha,
        linkedin: "https://www.linkedin.com/in/latisha-pinjari-79470328b/"
      },
      {
        name: "Noel Ninan Sheri",
        title:"App Developer",
        img : noel
      },
      {
        name: "Vaibhav Jangid",
        title: "Web Developer",
        img:vaibhav,
        linkedin:"https://www.linkedin.com/in/vaibhav-jangid-461b3128a/" 
      }
    ]
  },
  {
    name: "Robotics",
    image:elec,
    members: [
      {
        name: "Tejashwan Gangishetty",
        title: "Head of Robotics",
        img: Teja,
        linkedin: "https://www.linkedin.com/in/gteja120805/"
      },
      {
        name: "Vrisha Parikh",
        title: "Head of Robotics",
        img: Vrisha,
        linkedin: "https://www.linkedin.com/in/vrisha-parikh-7241b726b/"
      },
      {
        name: "Sanchita V",
        title: "Drone Engineer",
        img: sanchita,
        linkedin:"https://www.linkedin.com/in/sanchitha-v-5898b7225/"
      },
      {
        name: "Nainika Anish",
        title: "Drone Engineer",
        img: nain,
        linkedin: "https://www.linkedin.com/in/nainika-anish-74001b27a/"
      },
      {
        name: "Kavuru Manaswi",
        title:"Drone Engineer",
        img: manasvi
      },
      {
        name: "Abishek Guru",
        title:"PCB Designer",
        img:abhi,
        linkedin: "https://www.linkedin.com/in/mabishekguru2006/"
      },
      {
        name: "Mantha Tripura",
        title: "PCB Designer",
        img : mantha
      },
      {
        name: "Aditya Dhepe",
        title:"PCB Designer",
        img:abhi,
        linkedin: "https://www.linkedin.com/in/mabishekguru2006/"
      },
      {
        name: "Pachipulusu Poojit",
        title:"Drone Engineer",
        img:abhi,
        linkedin: "https://www.linkedin.com/in/mabishekguru2006/"
      },
    ]
  },
  {
    name: "Neuroscience & Biotechnology",
    image:neuro,
    members: [
      {
        name: "Dhiyanesh S",
        title: "Head of Neuroscience",
        img: Dhiyanesh,
        linkedin: "https://www.linkedin.com/in/dhiyanesh-srinivasan/"
      },
      {
        name: "Nikhilesh Puri",
        title: "Head of Biotechnology",
        img: niki,
        linkedin: "https://www.linkedin.com/in/nikhilesh-puri-b7a3542a8/"
      },
      // {
      //   name: "Pannaga Hedge",
      //   title: "RnD Specialist",
      //   img: ,
      //   linkedin: "https://www.linkedin.com/in/shreya-das-aa3657334/"
      // },
      // {
      //   name: "Kuldeep Janghir",
      //   title: "Chemical Engineer",
      //   img: ,
      //   linkedin: "https://www.linkedin.com/in/shreya-das-aa3657334/"
      // },
      
    ]
  },  
];
const OurTeam = () => {
  const [activeDeptIndex, setActiveDeptIndex] = useState(null);

  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0);

  const selectedDept = departmentData[selectedDeptIndex];

  const selectedMembers =
    activeDeptIndex !== null ? departmentData[activeDeptIndex].members : [];
  return (
    <div className="our-team-main">
      <div className="our-team-title">
        <p><a href="https://www.linkedin.com/company/baldmann/posts/?feedView=all">About BaldMann</a></p>
      </div>
        <div className='our-team-desc'>
          <p>BaldMann is a pioneering team in the brain-computer interface (BCI) industry, dedicated to advancing the integration of neuro technology into everyday applications. Specialising in EEG-based devices, BaldMann develops solutions that empower users to control both digital platforms and physical systems through brain signals. With applications that span gaming, robotics, and innovative interactive experiences, BaldMann is setting new standards in the BCI field, bridging neuroscience and technology for transformative user experiences.</p>
        </div>

          <p className='note-title'>Note from the Office</p>
          {/* <div className='note-div'>
            <div className='note-left'>
              <p className='note-content'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto totam nisi repellendus nemo? Maxime excepturi, corrupti ab optio deserunt nulla quis asperiores velit fugit perferendis laudantium mollitia nam ducimus eum.
              Ratione dicta fugit ex. Id, voluptate libero. Dolores iure aperiam, praesentium ipsam sunt velit nihil perferendis, laudantium a, mollitia quod recusandae quae architecto vel maxime? Quas hic nulla quae ipsam?
              Illo accusantium, reiciendis animi necessitatibus perspiciatis porro inventore magnam? Tempore omnis tempora vitae corrupti nobis quae quasi vel modi nemo cumque natus consequatur ducimus sint, molestias, obcaecati, beatae eius qui.</p>
              
              <p className='ceo-name'> <a href="https://www.linkedin.com/in/ketan-chouhan-47020826b/" className="linkedIn-link"><FaLinkedin/></a> Ketan Chouhan</p>
            </div>
            <div className='note-right'>
              <img src={ceo} alt="Profile" className="styled-photo"></img>
            </div>
          </div> */}
          <div className='note-div-o'>
            <div className='note-cto'>
              <div className='note-image'>
                <img src ={cto}></img>
                <p className='note-name'>Akshat Jain - CTO, Software</p>
              </div>    
              <p className='note-text'>We are building great things with a passionate team and a shared vision, chasing limitless potential together. <br></br>It’s been an exciting journey building BaldMann and growing alongside it both professionally and personally. The learnings and the impact have been incredible. Can't wait to see where it takes us next.</p>  
              <a href="https://www.linkedin.com/in/akshat-jain-362262275/" className="linkedIn-link">Connect on LinkedIn!</a>
            </div>
            <div className='note-cmo'>
              <div className='note-image'>
                <img src ={coo}></img>
                <p className='note-name'>Aditya Katoch - CTO, Hardware</p>
              </div>
              <p className='note-text'>We at BaldMann are currently in the RnD phase working on portable EEG and ECG-based technology trying to bring a better future. As CTO of Baldmann, I’m proud to be part of a team pushing the boundaries of health-tech and human-machine interaction. As a team, we are trying our best to create products that can truly benefit people all around the world.</p>
              <a href="https://www.linkedin.com/in/aditya-katoch-071b9324a/" className="linkedIn-link">Connect on LinkedIn!</a>
            </div>
          </div>
          <div className="the-dept-text">
            <p className='note-title'>The Departments</p>
            <div className="depts">
                {departmentData.slice(1).map((dept, i) => {
                  const actualIndex = i + 1; // real index in the original array
                  return (
                    <div key={actualIndex} className="departments">
                      <img src={dept.image} alt={`${dept.name} Icon`} className="dept-img" />
                      {dept.name}
                    </div>
                  );
                })}
            </div>
          </div>


          <div className = "bald-people">
          <p className='note-title'>Bald People</p>
          <div className="dept-section">
              <div className="dept-sidebar">
                {departmentData.map((dept, index) => (
                  <div
                    key={index}
                    className={`dept-tab ${index === selectedDeptIndex ? 'active' : ''}`}
                    onClick={() => setSelectedDeptIndex(index)}
                  >
                    {dept.name}
                  </div>
                ))}
              </div>

                <div className="dept-members">
                  {/* <h2>{selectedDept.name}</h2> */}
                  <div className="member-grid">
                    {selectedDept.members.map((member, i) => (
                      <div className="member-card" key={i}>
                        <img src={member.img} alt={member.name} />
                        <h4>{member.name}</h4>
                        <p>{member.title}</p>
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noreferrer">
                            <FaLinkedin className="linkedin-icon" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
            </div>
      </div>
      </div>
  );
};

export default OurTeam;



