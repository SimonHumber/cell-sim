# Cell Simulator Take Home Assignment

This is a simple React webapp meant to simulate growth patterns of bacterial colonies.

Basically, you've got cells in a grid, and the cells with divide in a given time interval.

You can click on the grid to toggle the cell, adjust size of the grid, adjust time of interval, start, stop, pause,.

This app has been deployed on Vercel and you can check it out here: https://cell-sim.vercel.app/

## Installation instructions

To install, enter these commands in your terminal:
```
npm install
npm run
```

## Summary
No external libraries were used, so it's just the React library.

This app starts from the Grid component. Grid will create the Cell component and pass the Vertex object.

How I made each Cell component be able to reference its neighbours was by creating a Vertex object. 
Vertex object will have properties that can be toggled, and each Cell component will have the Vertex fields 
as useEffect dependencies to trigger re-render. So when a Cell toggles the isGrown field of a neighbouring cell,
it will trigger useEffect hook and re-render the Grid

Each Cell component will have its own timer and setInterval function. Cells don't completely sync up their divisions, but it's pretty close!
At very large grid sizes, it will begin to slow down.
