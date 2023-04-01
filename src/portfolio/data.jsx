import myimg from '../assets/images/169.jpg'
import descriptionimg from '../assets/images/description.jpg'
import img1 from '../assets/images/1.jpg'
import img2 from '../assets/images/2.jpg'
import img3 from '../assets/images/3.jpg'
import img4 from '../assets/images/4.jpg'


////////////////!!!!!!!!!/////
/// for projects/projects
const p1 = {
  position : [-10, 0, 0],
  imgArray : [ img1, myimg ],
  rotation : [0, 0, 0],
  scale : 1,
  circleRotation : [0, 3/4 * Math.PI, 0 ],
  id: 1,
}

const p2 = {
  position : [ 0, 0, 10],
  imgArray : [ img2, myimg ],
  rotation : [ 0, Math.PI/2 , 0],
  scale : 1,
  circleRotation : [0, 1/4 * Math.PI, 0 ],
  id : 2,
}

const p3 = {
  position : [10, 0, 0],
  imgArray : [ img3, myimg ],
rotation : [0, 0, 0],
  scale : 1,
  circleRotation : [0, -1/4 * Math.PI, 0 ],
  id:3,
}

const p4 = {
  position : [ 0, 0, -10],
  imgArray : [ img4, myimg],
  rotation : [0 , Math.PI/2, 0],
  scale : 1,
  circleRotation : [0, -3/4 * Math.PI, 0 ],
  id:4,
}
//!!/////////////////!!!!!!!!!!!!!!!!!!!!!///////////////
//////////////////////////////////////////////////////////
// y = mx + b 

// I to P
// m= 0.5733
// b = -57.33 

//I to O 
//m = -0.5773
// b = 57.73


const getCoordinatesForSlope= (startingPoint, difference, m, b ) => {
  const array = []
  for( let i=0; i<= 29; i++){
    const x = startingPoint + (difference*i)
    const z = (m* x) + (b)
    const y = 0
    const coordinate = [x,y,z]
    array[i] = coordinate
  }
  for( let i=30; i<= 70; i++){
    const x = startingPoint + ( difference*i)
    const z = (m* x) + (b)
    const y = (i-10)/2 
    const coordinate = [x,y,z]
    array[i] = coordinate
  }
  for( let i=71; i<= 99; i++){
    const x = startingPoint + ( difference*i)
    const z = (m* x) + (b)
    const y = 20 
    const coordinate = [x,y,z]
    array[i] = coordinate
  }
  for( let i=100; i<= 120; i++){
    const x = startingPoint + ( difference*i)
    const z = (m* x) + (b)
    const y = 20- (i-100)/2 
    const coordinate = [x,y,z]
    array[i] = coordinate
  }
  for( let i=121; i<= 150; i++){
    const x = startingPoint + ( difference*i)
    const z = (m* x) + (b)
    const y = 0 
    const coordinate = [x,y,z]
    array[i] = coordinate
  }
  return array
}



const getCoordinatesForAxisParallel= (startingPointx, startingPointy, difference ) => {
  const array = []
  for( let i=0; i<= 29; i++){
    const x = startingPointx 
    const z = startingPointy + (i* difference)
    const y = 0 
    const coordinate = [x,y,z]
    array[i] = coordinate
  }
  for( let i=30; i<= 70; i++){
    const x = startingPointx 
    const z = startingPointy + (i* difference)
    const y = (i-10)/2 
    const coordinate = [x,y,z]
    array[i] = coordinate
  }
  for( let i=71; i<= 121; i++){
    const x = startingPointx 
    const z = startingPointy + (i* difference)
    const y = 20 
    const coordinate = [x,y,z]
    array[i] = coordinate
  }
  for( let i=122; i<= 142; i++){
    const x = startingPointx 
    const z = startingPointy + (i* difference)
    const y = 20- (i-122)/2 
    const coordinate = [x,y,z]
    array[i] = coordinate
  }
  for( let i=143; i<= 173; i++){
    const x = startingPointx 
    const z = startingPointy + (i* difference)
    const y = 0 
    const coordinate = [x,y,z]
    array[i] = coordinate
  }
  return array
}


const pointsFromItoP = getCoordinatesForSlope(100, -1, 0.5733, -57.33 )
pointsFromItoP.push([-50,0,-86.60254])

const pointsFromPtoI = getCoordinatesForSlope( -50, 1, 0.5733, -57.33 )
pointsFromPtoI.push([100,0,0])

const pointsFromItoO = getCoordinatesForSlope( 100, -1, -0.5773 , 57.73  )
pointsFromItoO.push([-50,0,86.60254])

const pointsFromOtoI = getCoordinatesForSlope( -50, 1, -0.5773 , 57.73 )
pointsFromOtoI.push([100,0,0])

const pointsFromPtoO = getCoordinatesForAxisParallel( -50, -86.60254, 1 )
pointsFromPtoO.push([-50,0,86.60254])

const pointsFromOtoP = getCoordinatesForAxisParallel( -50, 86.60254, -1 )
pointsFromOtoP.push([-50,0,-86.60254])

//////

const getPitchesForSlope= () => {
  const array = []
  for( let i=0; i<= 9 ; i++){
    const z = 0
    array[i] = z
  }
  //0 to -20
  for( let i= 10 ; i<= 69 ; i++){
    const z = -Math.PI/180 * (i-9) * 20/50
    array[i] = z
  }
  // -20 to 0
  for( let i= 70; i<= 89 ; i++){
    const z =(-Math.PI/180*20) + (Math.PI/180* (i-69))
    array[i] = z
  }
  //0
  for( let i= 90; i<= 100 ; i++){
    const z = 0
    array[i] = z
  }
  // 0 to 20
  for( let i= 100; i<= 119 ; i++){
    const z = 0
    array[i] = z
  }
  //20 to 0
  for( let i= 120; i<= 139 ; i++){
    const z = 0
    array[i] = z
  }
  //0
  for( let i= 140; i<= 151 ; i++){
    const z = 0
    array[i] = z
  }
  return array
}


const getPitchesForAxisParallel= ( ) => {
  const array = []
  for( let i=0; i<= 9 ; i++){
    const z = 0
    array[i] = z
  }
  //0 to -20
  for( let i= 10 ; i<= 69 ; i++){
    const z = -Math.PI/180 * (i-9) * 20/50
    array[i] = z
  }
  // -20 to 0
  for( let i= 70; i<= 89 ; i++){
    const z =(-Math.PI/180*20) + (Math.PI/180* (i-69))
    array[i] = z
  }
  //0
  for( let i= 90; i<= 119 ; i++){
    const z = 0
    array[i] = z
  }
  // 0 to 20
  for( let i= 120; i<= 139 ; i++){
    const z = 0
    array[i] = z
  }
  //20 to 0
  for( let i= 140; i<= 159 ; i++){
    const z = 0
    array[i] = z
  }
  //0
  for( let i= 160; i<= 174 ; i++){
    const z = 0
    array[i] = z
  }
  return array
}

const pitchesForSlope = getPitchesForSlope()
const pitchesForAxisParallel = getPitchesForAxisParallel()



////////////////////////////
export const data = { p1 , p2 , p3, p4, pointsFromItoP, pointsFromPtoI, pointsFromItoO, pointsFromOtoI, pointsFromPtoO, pointsFromOtoP , pitchesForSlope, pitchesForAxisParallel }