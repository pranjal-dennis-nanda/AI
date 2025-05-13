function RemoveElt(array,elt)
{
  for(let i=array.length-1;i>=0;i--)
    {
if(array[i]==elt)
  {
array.splice(i,1);
  }
    }
}

function heuristic(a,b)
{
  return dist(a.i,b.i,a.j,b.j);
}
let cols=50
let rows=50
let grid=new Array(cols)
let openSet=[]
let closedSet=[]
let start,end
let w,h
let path=[]
let current

function setup() {
  createCanvas(800, 800);
  console.log('A* path finding algorithm')
  w=width/cols
  h=height/rows
  for(let i=0;i<cols;i++)
    {
      grid[i]=new Array(rows)
    }
  for(let i=0;i<cols;i++)
    {
for(let j=0;j<rows;j++){
  grid[i][j]=new Spot(i,j)
  
}
    }
  for(let i=0;i<cols;i++)
    {
      for(let j=0;j<rows;j++)
        {
          grid[i][j].addNeighbours(grid)
}
    }
  start=grid[0][0]
  end=grid[cols-1][rows-1]
  start.wall=false
  end.wall=false
  openSet.push(start)
  
}

function draw() {
 if(openSet.length>0)
   {
     let winner=0
     for(let i=0;i<openSet.length;i++)
       {
         if(openSet[i].f < openSet[winner].f)
           {
winner=i
           }
         
}

  current=openSet[winner]
  if(current===end)
    {
      noLoop()
      console.log('Path found')
}
  RemoveElt(openSet,current)
  closedSet.push(current)
  let neighbours=current.neighbors
  for(let i=0;i<neighbours.length;i++){
    
    let neighbour=neighbours[i]
    if(!closedSet.includes(neighbour) && !neighbour.wall)
      {
        let tempG=current.g+heuristic(neighbour,current)
        let newPath=false
        if(openSet.includes(neighbour))
          {
            if(tempG<neighbour.g)
              {
                neighbour.g=tempG
                newPath=true
              }
}
        else{
          neighbour.g=tempG
          newPath=true
          openSet.push(neighbour)
          
        }
        if(newPath)
          {
            neighbour.h=heuristic(neighbour,end)
            neighbour.f=neighbour.g+neighbour.h
            neighbour.previous=current
}
      }
        
        
}
    
}
  else{
    console.log('No solution')
    noLoop()
    return
    
  }
    background(45,197,244)
    for(let i=0;i<cols;i++)
      {
        for(let j=0;j<rows;j++)
          {
            grid[i][j].show(color(255))
}
}
    for(let i=0;i<closedSet.length;i++)
      {
        closedSet[i].show(color(236,1,90,100))
}
    for(let i=0;i<openSet.length;i++)
      {
        openSet[i].show(color(240,99,164,100))
}
    path=[]
    let temp=current
    path.push(temp)
    while(temp.previous)
      {
        path.push(temp.previous)
        temp=temp.previous
      }
    noFill()
    stroke(252,238,33)
    strokeWeight(w/2)
    beginShape()
    for(let i=0;i<path.length;i++)
      {
        vertex(path[i].i*w+w/2,path[i].j*h+h/2)
}
    endShape()
}
  function Spot(i,j)
  {
    this.i=i
    this.j=j
    this.f=0
    this.g=0
    this.h=0
    this.neighbors=[]
    this.previous=undefined
    this.wall=false
    if(random(1)<0.3)
      {
        this.wall=true
      }
    this.show=function(col)
    {
      if(this.wall)
        {
          fill(0)
}
      else{
        fill(col)
      }
      noStroke()
      rect(this.i*w,this.j*h,w-1,h-1)
    }
    this.addNeighbours=function(grid)
    {
      let i=this.i
      let j=this.j
      if(i<cols-1)
        {
          this.neighbors.push(grid[i+1][j])
        }
      if(i>0)
        {
          this.neighbors.push(grid[i-1][j])
}
      if(j<rows-1)
        {
          this.neighbors.push(grid[i][j+1])
}
      if(j>0)
        {
          this.neighbors.push(grid[i][j-1])
        }
      if(i>0 && j>0)
        {
        this.neighbors.push(grid[i-1][j-1])
}
      if(i<cols-1 && j>0)
        {
          this.neighbors.push(grid[i+1][j-1])
}
      if(i>0 && j<rows-1)
        {
          this.neighbors.push(grid[i-1][j+1])
}
      if(i<cols-1 && j<rows-1)
        {
          this.neighbors.push(grid[i+1][j+1])
}
      
    }
}
