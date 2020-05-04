import React, {useState, useEffect} from 'react';
import Video from 'twilio-video';

const Room = ({ roomName, token, handleLogout, handleUpdateSalas }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipantes] = useState([]);

  useEffect(() => {

    const participantConnected = participante => {
      setParticipantes(prevParticipantes => [...prevParticipantes, participante]);
    };

    const participantDisconnected = participante => {
      setParticipantes(prevParticipantes =>
        prevParticipantes.filter(p => p !== participante)
      );
    };


    Video.connect(token, {
        name: roomName,
        tracks: []
    }).then(room => {
        setRoom(room);
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        room.participants.forEach(participantConnected);
    });


    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  // const remoteParticipants = participants.map(participant => (
  //   <Participant key={participant.sid} participant={participant} />
  // ));

   return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">
        {/*{room ? (*/}
        {/*  <Participant*/}
        {/*    key={room.localParticipant.sid}*/}
        {/*    participant={room.localParticipant}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  ''*/}
        {/*)}*/}
      </div>
      <h3>Remote Participants</h3>
      {/*<div className="remote-participants">{remoteParticipants}</div>*/}
    </div>
  );
};

export default Room;
