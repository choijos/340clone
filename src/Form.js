import React, {useState } from 'react';
import firebase from 'firebase';
import { Footer } from './NavFoot'

function Form(props) {

    const [inputDateValue, setDateValue] = useState('')

    const handleDate = (event) => {
        let newValue = event.target.value
        setDateValue(newValue);
    }

    const [inputMoodRangeValue, setMoodValue] = useState(3)

    const handleMoodRangeChange = (event) => {
        let newValue = event.target.value
        setMoodValue(newValue);
    }

    const [inputWaterValue, setWater] = useState(false)

    const handleWaterChange = (event) => {
        let newValue = event.target.value
        setWater(newValue);
    }

    const [inputSleepValue, setSleepValue] = useState(false)

    const handleSleepChange = (event) => {
        let newValue = event.target.value
        setSleepValue(newValue);
    }

    const [inputExerciseValue, setExerciseValue] = useState(false)

    const handleExerciseChange = (event) => {
        let newValue = event.target.value
        setExerciseValue(newValue);
    }

    const [inputFriendValue, setFriendValue] = useState(false)

    const handleFriendChange = (event) => {
        let newValue = event.target.value
        setFriendValue(newValue);
    }

    const [inputHighlightValue, setHighlightValue] = useState('');

    const handleHighlight = (event) => {
        let newValue = event.target.value
        setHighlightValue(newValue);
    }

    const [inputStruggleValue, setStruggleValue] = useState('');

    const handleStruggle = (event) => {
        let newValue = event.target.value
        setStruggleValue(newValue);
    }

    const [inputReflectionValue, setReflectionValue] = useState('');

    const handleReflection = (event) => {
        let newValue = event.target.value
        setReflectionValue(newValue);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let acts = [];
        if(inputWaterValue) {
            acts.push("Drank water");

        } 
        if(inputSleepValue) {
            acts.push("Got a full night's sleep")

        }
        if(inputFriendValue) {
            acts.push("Met a Friend");

        }
        if(inputExerciseValue) {
            acts.push("Exercised");

        }

        let activitiesString = acts.join(',');

        const newEntryObj = {
            activities: activitiesString,
            avgMood: inputMoodRangeValue,
            date: inputDateValue,
            highlights: inputHighlightValue,
            reflection: inputReflectionValue,
            struggles: inputStruggleValue,
        }

        firebase.database().ref('users').child(props.currentUserID).push(newEntryObj);

        setDateValue('');
        setMoodValue('');
        setSleepValue(false);
        setWater(false);
        setFriendValue(false);
        setExerciseValue(false);
        setHighlightValue('');
        setStruggleValue('');
        setReflectionValue('');
    }

    return (
        <div>
            <header>
                <div class="headerspace">
                    <h1>Daily Entry</h1>
                    <p>Log your daily feelings and activities.</p>
                </div>
            </header>
            <main>
                <section>
                    <form id="form-grab" onSubmit={handleSubmit}>
                        <div className="form-around">
                            <h2>How was your day?</h2>
                            <div className="row">
                            <div className="col col-12 col-sm-6">
                                <label for="journal_date" className="main-labels"><h3 className="small">Journal Date:</h3></label>
                                <input type="date" onChange={handleDate} value={inputDateValue} className="form-control" id="journal_date" name="journal_date" required/>
                            </div>
                                <div className="col col-12 col-sm-6">
                                    <label for="mood" className="main-labels"><h3 className="small">Rate your average mood on a scale of 0-5:</h3></label>
                                    <input 
                                        type="range" 
                                        onChange={handleMoodRangeChange} 
                                        value={inputMoodRangeValue} 
                                        className="range-form" id="mood" list="ticks" name="mood" min="1" max="5" step="1" />
                                    <datalist id="ticks">
                                        <option value="1"></option>
                                        <option value="2"></option>
                                        <option value="3"></option>
                                        <option value="4"></option>
                                        <option value="5"></option>
                                    </datalist>
                                </div>
                            </div>
                            <div className="form-space">
                                <h3 className="small">Daily Activites:</h3>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" 
                                        onChange={handleWaterChange} 
                                        checked={inputWaterValue} 
                                        id="activity1" name="activity1"
                                        value="Drank Water" />
                                    <label for="activity1">Drank water</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" 
                                        onChange={handleSleepChange} 
                                        checked={inputSleepValue} 
                                        id="activity2" name="activity2" value="Got a Full night's sleep"/>
                                    <label for="activity2">Got a full night's sleep</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" onChange={handleExerciseChange} checked={inputExerciseValue} id="activity3" name="activity3" value="Exercised"/>
                                    <label for="activity3">Exercised</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" onChange={handleFriendChange} checked={inputFriendValue} id="activity4" name="activity4" value="Met a friend"/>
                                    <label for="activity4">Met a Friend</label>
                                </div>
                            </div>
                            <div>
                                <label for="highlight_field" className="main-labels"><h3 className="small">Highlight(s) of the day:</h3></label>
                                <input type="text" 
                                    onChange={handleHighlight} 
                                    value={inputHighlightValue} 
                                    className="form-control" id="highlight_field" name="highlight" required/>
                            </div>
                            <div>
                                <label for="struggle_field" className="main-labels"><h3 className="small">Struggle(s) of the day:</h3></label>
                                <input type="text" 
                                    onChange={handleStruggle} 
                                    value={inputStruggleValue} 
                                    className="form-control" id="struggle_field" name="struggle" required/>
                            </div>
                            <div>
                                <label for="main_journal_field" className="main-labels"><h3 className="small">Reflecting on today:</h3></label>
                                <input type="text" 
                                    onChange={handleReflection} 
                                    value={inputReflectionValue} 
                                    className="form-control" id="main_journal_field" name="entry" required/>
                            </div>
                            <div className="flex-container holdcenter">
                                <button type="submit" className="button" id="submit-button"><em aria-label="save entry"><strong>Save journal entry</strong></em></button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Form;