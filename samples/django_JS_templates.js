// Integrating Django Templates with Javascript for Data Visualization

// [...]

var geometry, material, star;

{% for star in stars %}
  var url = "{% url 'stellar_system' star.pk %}";
  createStar({{star.stellar_temp}}, {{star.right_ascension}}, {{star.declination}}, {{star.light_years_dist}}, url);
{% endfor %}

// [...]

function createStar (temp, ra, declination, ly, path) {
  color = star_color(temp);
  geometry = new THREE.SphereGeometry(1, 15, 15);
  material = new THREE.MeshBasicMaterial({color: color, wireframe:false});
  star = new THREE.Mesh(geometry, material);
  scene.add(star);
  star.position.set((ra - 290) * 5 * (ly / 1000), (declination - 45) * 5 * (ly / 1000),ly - 500);
  stars[star.id - 1] = path;
  // Star glow (using sprites)
  var spriteMaterial = new THREE.SpriteMaterial({
    map: Textures.glow,
    color: color, transparent: false, blending: THREE.AdditiveBlending
  });
  sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set(8, 8, 8);
  star.add(sprite);
}

// [...]
