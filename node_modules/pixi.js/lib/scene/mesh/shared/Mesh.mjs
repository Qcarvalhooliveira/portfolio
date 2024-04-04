import { Polygon } from '../../../maths/shapes/Polygon.mjs';
import { Geometry } from '../../../rendering/renderers/shared/geometry/Geometry.mjs';
import { State } from '../../../rendering/renderers/shared/state/State.mjs';
import { Texture } from '../../../rendering/renderers/shared/texture/Texture.mjs';
import { deprecation, v8_0_0 } from '../../../utils/logging/deprecation.mjs';
import { Container } from '../../container/Container.mjs';
import { MeshGeometry } from './MeshGeometry.mjs';

"use strict";
const tempPolygon = new Polygon();
class Mesh extends Container {
  constructor(...args) {
    let options = args[0];
    if (options instanceof Geometry) {
      deprecation(v8_0_0, "Mesh: use new Mesh({ geometry, shader }) instead");
      options = {
        geometry: options,
        shader: args[1]
      };
      if (args[3]) {
        deprecation(v8_0_0, "Mesh: drawMode argument has been removed, use geometry.topology instead");
        options.geometry.topology = args[3];
      }
    }
    const { geometry, shader, texture, roundPixels, state, ...rest } = options;
    super({
      label: "Mesh",
      ...rest
    });
    this.renderPipeId = "mesh";
    this.canBundle = true;
    this._roundPixels = 0;
    this.allowChildren = false;
    this.shader = shader;
    this.texture = texture ?? shader?.texture ?? Texture.WHITE;
    this.state = state ?? State.for2d();
    this._geometry = geometry;
    this._geometry.on("update", this.onViewUpdate, this);
    this.roundPixels = roundPixels ?? false;
  }
  /**
   *  Whether or not to round the x/y position of the mesh.
   * @type {boolean}
   */
  get roundPixels() {
    return !!this._roundPixels;
  }
  set roundPixels(value) {
    this._roundPixels = value ? 1 : 0;
  }
  /** Alias for {@link scene.Mesh#shader}. */
  get material() {
    deprecation(v8_0_0, "mesh.material property has been removed, use mesh.shader instead");
    return this._shader;
  }
  /**
   * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
   * Can be shared between multiple Mesh objects.
   */
  set shader(value) {
    if (this._shader === value)
      return;
    this._shader = value;
    this.onViewUpdate();
  }
  get shader() {
    return this._shader;
  }
  /**
   * Includes vertex positions, face indices, colors, UVs, and
   * custom attributes within buffers, reducing the cost of passing all
   * this data to the GPU. Can be shared between multiple Mesh objects.
   */
  set geometry(value) {
    if (this._geometry === value)
      return;
    this._geometry?.off("update", this.onViewUpdate, this);
    value.on("update", this.onViewUpdate, this);
    this._geometry = value;
    this.onViewUpdate();
  }
  get geometry() {
    return this._geometry;
  }
  /** The texture that the Mesh uses. Null for non-MeshMaterial shaders */
  set texture(value) {
    if (this._texture === value)
      return;
    if (this.shader) {
      this.shader.texture = value;
    }
    this._texture = value;
    this.onViewUpdate();
  }
  get texture() {
    return this._texture;
  }
  get batched() {
    if (this._shader)
      return false;
    if (this._geometry instanceof MeshGeometry) {
      if (this._geometry.batchMode === "auto") {
        return this._geometry.positions.length / 2 <= 100;
      }
      return this._geometry.batchMode === "batch";
    }
    return false;
  }
  /**
   * The local bounds of the mesh.
   * @type {rendering.Bounds}
   */
  get bounds() {
    return this._geometry.bounds;
  }
  /**
   * Adds the bounds of this object to the bounds object.
   * @param bounds - The output bounds object.
   */
  addBounds(bounds) {
    bounds.addBounds(this.geometry.bounds);
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(point) {
    const { x, y } = point;
    if (!this.bounds.containsPoint(x, y))
      return false;
    const vertices = this.geometry.getBuffer("aPosition").data;
    const points = tempPolygon.points;
    const indices = this.geometry.getIndex().data;
    const len = indices.length;
    const step = this.geometry.topology === "triangle-strip" ? 3 : 1;
    for (let i = 0; i + 2 < len; i += step) {
      const ind0 = indices[i] * 2;
      const ind1 = indices[i + 1] * 2;
      const ind2 = indices[i + 2] * 2;
      points[0] = vertices[ind0];
      points[1] = vertices[ind0 + 1];
      points[2] = vertices[ind1];
      points[3] = vertices[ind1 + 1];
      points[4] = vertices[ind2];
      points[5] = vertices[ind2 + 1];
      if (tempPolygon.contains(x, y)) {
        return true;
      }
    }
    return false;
  }
  /** @ignore */
  onViewUpdate() {
    this._didChangeId += 1 << 12;
    if (this.didViewUpdate)
      return;
    this.didViewUpdate = true;
    if (this.renderGroup) {
      this.renderGroup.onChildViewUpdate(this);
    }
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(options) {
    super.destroy(options);
    const destroyTexture = typeof options === "boolean" ? options : options?.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
      this._texture.destroy(destroyTextureSource);
    }
    this._geometry?.off("update", this.onViewUpdate, this);
    this._texture = null;
    this._geometry = null;
    this._shader = null;
  }
}

export { Mesh };
//# sourceMappingURL=Mesh.mjs.map
