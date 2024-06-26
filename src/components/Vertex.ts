class Vertex {
  isGrown: boolean = false;
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  toggle() {
    this.isGrown = !this.isGrown;
  }
}
export default Vertex;
