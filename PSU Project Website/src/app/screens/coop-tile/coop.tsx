import "../../../styles/chickenCss/coop.css";
import DoorControl from "../../components/chickenComponents/doorControl";
import WasteReminder from "../../components/chickenComponents/wasteReminder";
import { useEffect, useState } from "react";
import LogWaste from "../../components/chickenComponents/logWaste";
import FertilizerSteps from "../../components/chickenComponents/fertilizerSteps";

type CoopRecords = {
    coopId: number;
    zoneId: number;
    coopName: string;
    capacity: number;
    notes: string;
    doorOpen: string;
    doorClose: string;
    reminderDate: string;
    reminderPeriod: number;
    createdAt: string;
}


function Coop(){
    const [coopData, setCoopData] = useState<CoopRecords[] | null>([]);
    const [selectedCoop, setSelectedCoop] = useState<CoopRecords | null>(null);
    const [coopId, setCoopId] = useState(0);
    const [zoneId, setZoneId] = useState(0);
    const [coopName, setCoopName] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [notes, setNotes] = useState("");
    const [openTime,setOpenTime]=useState("");
    const [closeTime,setCloseTime]=useState("");
    const [reminderDate, setReminderDate] = useState("");
    const [reminderPeriod, setReminderPeriod] = useState(0);

    useEffect(() => {
        //console.log("useEffect fired");
        const fetchCoopData = async () => {
            try {
                const res = await fetch(`/api/coopSelect`);
                //console.log("Response status:", res.status);
                const data = await res.json();
               
                const coopRecords= data.map((item: any) => ({
                    coopId: item.coopId,
                    zoneId: item.zoneId,
                    coopName: item.coopName,
                    capacity: item.capacity,
                    notes: item.notes,
                    doorOpen: item.doorOpen,
                    doorClose: item.doorClose,
                    reminderDate: item.reminderDate,
                    reminderPeriod: item.reminderPeriod,
                    createdAt: item.createdAt,
                }));
                console.log("Fetched data: ", coopRecords);
                setCoopData(coopRecords);
                if (coopRecords.length > 0) {
                    setSelectedCoop(coopRecords[0]);
                    //console.log("Data was fetched")
                }
            } catch (error) {
                console.error("Error fetching coop data:", error);
            }
        };

        fetchCoopData();
    }, []);

     useEffect(() => {
        if (selectedCoop) {
            setCoopId(selectedCoop.coopId);
            setZoneId(selectedCoop.zoneId);
            setCoopName(selectedCoop.coopName);
            setCapacity(selectedCoop.capacity);
            setNotes(selectedCoop.notes);
            setOpenTime(selectedCoop.doorOpen);
            //console.log("Open time set to:", selectedCoop.doorOpen);
            setCloseTime(selectedCoop.doorClose);
            setReminderDate(selectedCoop.reminderDate);
            console.log("Reminder date set to:",reminderDate);
            setReminderPeriod(selectedCoop.reminderPeriod);
        }
    }, [selectedCoop]);

    const [doorState, setDoorState] = useState(false);

    useEffect(()=>  {
        const currentTime = new Date();
        const open = new Date(`${currentTime.toDateString()} ${openTime}`);
        const close = new Date(`${currentTime.toDateString()} ${closeTime}`);
        setDoorState(currentTime > open && currentTime < close);
    }, [openTime, closeTime]);

    const [poopLog, setHidePoopLog] = useState(true);
    const [steps, setHideSteps] = useState(true);
   
    //console.log("Data"+selectedCoop);
    //console.log(coopData);

    return(

        <main className="coop-page main-content">
        <section id="top">
            <DoorControl doorState={doorState} setDoorState={setDoorState} 
            times={[openTime, closeTime]} setOpenTime={setOpenTime} setCloseTime={setCloseTime} coopId={coopId} />
            <WasteReminder date={reminderDate} period={reminderPeriod} setDate={setReminderDate} 
            setPeriod={setReminderPeriod} coopId={coopId} coopName={coopName} />
        </section>
        <section id="log-poop">
            <div onClick={() => setHidePoopLog((current) => !current)} style={{userSelect:"none"}}>
                <h2  style={{cursor:"pointer"}}>Log Waste Collection
                    <img className="formIcons" src={poopLog ? "/chickenImages/down-arrow.svg" : "/chickenImages/up-arrow.svg"} alt=""/>
                </h2>
            </div>
        

            {!poopLog && <LogWaste coopId={coopId} period={reminderPeriod} reminderDate={reminderDate} setReminderDate={setReminderDate} />}
        </section>
        <section id="steps-section">
            <div onClick={() => setHideSteps((current) => !current)} style={{userSelect:"none"}}>
                <h2 className="" style={{cursor:"pointer"}}>Fertiliser Instructions:
                    <img className="formIcons" src={steps ? "/chickenImages/down-arrow.svg" : "/chickenImages/up-arrow.svg"} alt=""/>
                </h2>
            </div>
            
            {!steps && <FertilizerSteps />}
        </section>
        </main>
    )
}   

export default Coop;