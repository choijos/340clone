import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import firebase from 'firebase';
import { Footer } from './NavFoot';
import Moment from './Moment';
import { Redirect } from 'react-router-dom';

export function Main(props) {
  const [daysArray, setDaysArray] = useState([]);
  const [dayData, setDayData] = useState();
  const [newUser, setNewUser] = useState(true);
  const [stillLoading, setStillLoading] = useState(true);

  useEffect(() => {
    let allDays = firebase.database().ref('users').child(props.currentUserID);
    allDays.on('value', (snapshot) => {
      let days = snapshot.val();
      if(days) {
        if(newUser) {
          setNewUser(false);

        }

        setStillLoading(false)

        let dayKeys = Object.keys(days);
        let array = dayKeys.map((key) => {
          const singleDayCopy = {...days[key]};
          singleDayCopy.key = key;
    
          return singleDayCopy;
    
        });

        setDaysArray(array);

        if(dayData === undefined) {
          return null;

        }
      
      }

      setStillLoading(false);

    });
  
  }, [])

  useEffect(() => {
    setDayData(daysArray[0]);
    }, [daysArray]);

  let today = new Date();
  let thisMonth = today.getMonth() + 1;
  let thisYear = today.getFullYear();
  if(thisMonth < 10) {
    thisMonth = '0' + thisMonth;

  }

  const handleClick = (day) => {
    let selectedDay = day;
    if(selectedDay < 10) {
      selectedDay = '0' + selectedDay;

    }

    let selectedDate = thisYear + '-' + thisMonth + '-' + selectedDay;
    for(let i=0; i < daysArray.length; i++) {
      let entry = daysArray[i];
      if(entry.date === selectedDate) {
        setDayData(daysArray[i]);

      }

    }

  }

  if(stillLoading) {
    return (
      <div className="text-center center-spinner">
        <div className="spinner-grow text-info" role="status">
        </div>
      </div>
    );

  }

  return (
    <div>
      <div className="push">
        <header>
          <div className="headerspace">
            <h1>Mood Journal</h1>
            <p>Track your emotional life</p>
          </div>
        </header>
        <main>
          <div className="flex-container">
            <section className="main">
              <div className="flex-container">
                <OverheadOverview today={today} newUser={newUser} userData={daysArray} dayData={dayData} clickCallback={handleClick}/>
                <DayOverview newUser={newUser} dayData={dayData} />
                <MomentsBox />
              </div>
            </section>
            <Resources resourceList={props.resourceList} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );

}


function OverheadOverview(props) { // newUser
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let today = props.today;
  let overviewHeader = months[today.getMonth()] + ' In Color';
  const [moment, setMoment] = useState('');
  const handleClick = (event) => {
    event.preventDefault();
    setMoment(props.dayData.date);
  }
  if (moment) {
    let path = "/moment/" + moment;
    return (
      <Redirect push to={path}>
        <Moment />
      </Redirect>
    );
  }

  if(props.newUser) {
    return (
      <div className="row visuals">
        <h2 className="h3">{overviewHeader}</h2>
        <div className="moveside">
          <Grid userData={props.userData} todayObj={today} clickCallback={props.clickCallback}/>
          <OverviewReflection dayData={props.dayData} />
        </div>
      </div>
    );

  } else {

  return (
      <div className="row visuals">
        <h2 className="h3">{overviewHeader}</h2>
        <div className="moveside">
          <Grid userData={props.userData} todayObj={today} clickCallback={props.clickCallback}/>
          <OverviewReflection dayData={props.dayData} />
          <button type="submit" className="button" aria-label="view moments" onClick={handleClick}>View moments</button>
        </div>
      </div>
    );
  }
  
}


function Grid(props) {
  let moods = ['one', 'two', 'three', 'four', 'five'];
  let userDays = props.userData;
  let today = props.todayObj;
  let monthFirstDate = new Date(today.getFullYear(), today.getMonth(), 1);
  let monthLastDate = new Date(today.getFullYear(), (today.getMonth() + 1), 0);
  let clickHandler = () => {}

  let gridCount = _.range(35);
  let gridCreate = gridCount.map((dayNum) => {
    let month = today.getMonth() + 1;
    let day = dayNum;
    clickHandler = () => {
        props.clickCallback(dayNum);
    };

    if(month < 10) {
        month = "0" + month;
        
    }
    if(day < 10) {
        day = "0" + day;

    }

    let cleanDate = today.getFullYear() + "-" + month + "-" + day;
    let findDay = _.find(userDays, {date: cleanDate});
    let classes = "grid-box";

    if(findDay) {
        classes += " colored-box " + moods[findDay.avgMood - 1];

    } else {
      if(dayNum < 7) {
        if(dayNum < monthFirstDate.getDay()) {
          classes += " not-yet";
          day = "";

        } else {
          classes += " to-go";

        }

      } else if(dayNum > monthLastDate.getDate()) {
        classes += " not-yet";
        day = "";

      } else {
        classes += " to-go";

      }

    }
    return <div key={dayNum} className={classes} fullDate={cleanDate} onClick={clickHandler}>{day}</div>

  });

  return (
    <div className="grid" aria-label="Overview of mood for the month">
      {gridCreate}
    </div>
  );

}
  
  
function OverviewReflection(props) {
  if(!props.dayData) {
    return (
      <div className="flex-container msg holdcenter">
        <div className="alert alert-info alert-wide-center">
          <p>Start Journaling! Navigate to the <strong>'Daily Entry'</strong> tab in the navigation bar.</p>
          <p>______________</p>
          <p>Here is where you will be able to view your reflections from various days! As you fill in journal entries, the calendar on the left will start to fill with color reflecting your reported mood that day.</p>
        </div>
      </div>
    );

  } else {
    return (
      <div className="flex-container msg holdcenter">
        <div className="row down">
          <p className="text-info"><strong>Click on one of the month grid boxes with color to view details from that day!</strong></p>
        </div>
        <div className="row down">
          <span className="journaltoday"><h2 className="h3">{props.dayData.date.slice(5) + ' Reflection'}</h2>
          <p className="display-ref">{props.dayData.reflection}</p></span> 
        </div>
      </div>
    );

  }
  
}
  
  
function DayOverview(props) {
  let data = props.dayData;

  if(data) {
    let moods = ["awful", "terrible", "ok", "terrific", "awesome"];
    
    let activitiesArray = props.dayData.activities.split(',')
    let activitiesElem = activitiesArray.map((activity) => {
      return <li key={activity}>{activity}</li>

    });

    return (
      <div className="visuals row" id="day">
        <h2 className="h3">Overview of Day</h2>
        <div className="overview-content">
          <p className="avg-mood">You reported feeling <strong className="mood-word">{moods[data.avgMood - 1]}</strong> throughout the day</p>
          <div className="text-center">
            <ul className="activities">
              <p>Your activities from today included</p>
              {activitiesElem}
            </ul>
          </div>
          <p className="user-highlight">Your highlight of the day was "{data.highlights}"</p>
          <p className="user-struggle">Your struggle of the day was "{data.struggles}"</p>
        </div>
      </div>
    );

  } else {
    return (
      <div className="visuals row" id="day">
        <h2 className="h3 mb">Overview of Day</h2>
        <div className="alert alert-info">
          <p>This is where recorded highlights, struggles, and any activities for a given day will be displayed</p>
        </div>
      </div>
    );

  }

}

function MomentsBox(props) {
  return (
    <div className="visuals">
      <h2 className="h3">Moments</h2>
      <div className="flex-container img-container" id="moments">
        <div>
          <img src="img/friends.jpg" alt="Night with friends at the beach" />
          <p><cite><a href="https://unsplash.com/photos/AZMmUy2qL6A">At the beach</a></cite></p>
        </div>
        <div className="secondmoment">
          <img src="img/project.jpg" alt="Working on project" />
          <p><cite><a href="https://unsplash.com/photos/5fNmWej4tAA">Working</a></cite></p>
        </div>
      </div>
    </div>
  );
  
}

function Resources(props) {
  const [resList, setResList] = useState([]);

  useEffect(() => {
    let resources = firebase.database().ref('resources');
    resources.on('value', (snapshot) => {
      let res = snapshot.val();
      let resKeys = Object.keys(res);
      let resArray = resKeys.map((key) => {
        const singleResCopy = {...res[key]};
        singleResCopy.key = key;

        return singleResCopy;
  
      });

      setResList(resArray);

      if(resList === undefined) {
        return null;

      }

    });
  
  }, []);

  let mappedResources = resList.map((resourceInfo) => {
    return (
      <div className="col col-6 col-sm-4 col-md-3 col-lg-12 holdcenter move-back" key={resourceInfo.altInfo}>
        <img src={resourceInfo.source} className="resourceimg" alt={resourceInfo.altInfo} />
        <p><cite><a href={resourceInfo.ref}>{resourceInfo.head}</a></cite></p>
      </div>
    );

  });

  return (
    <section className="visuals resources holdcenter">
      <h2 className="h3">Resources</h2>
      <div className="row">
        {mappedResources}
      </div>
    </section>
  );
  
}


export default Main;