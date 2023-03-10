import { Link } from 'react-router-dom';

import { CLASSES } from '../data';

export default function Builds() {
  const sortedClasses = CLASSES.sort((a: any, b: any) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  })

  function getImageUrl(name: string) {
    return new URL(`../assets/builds/${name}.png`, import.meta.url).href
  }

  const buildsList = sortedClasses.map((c: any, i: number) => {

    const className = c.name.toLowerCase();

    const classImageUrl = new URL(`../assets/${className}.jpg`, import.meta.url).href;

    const specList = c.specs.map((s: any) => {
      const specName = `${s.name.toLowerCase().replace(/ /g, "-")}-${c.name.toLowerCase()}`
      const url = getImageUrl(specName);

      return (
        <Link to={`/${specName}`}>
          <div className="spec">
            <div className="specCard" key={`spec-${specName}`}>
              <div className="specBg" style={{ backgroundImage: `url(${url})`}}></div>
              <div className="specWrapper">
                {specName === 'feral-druid' && <div className="specBadge">New</div>}
                <h4 className="specTitle">{s.name}</h4>
                <div className="stats">
                  <p>Survability <strong className={s.survivability}>{s.survivability}</strong></p>
                  <p>Damage <strong className={s.damage}>{s.damage}</strong></p>
                  <p>Utility <strong className={s.utility}>{s.utility}</strong></p>
                </div>
              </div>
            </div>
            <span className="specLink link">Read guide</span>
          </div>
        </Link>
      )
    })

    return (
      <div key={`build-${i}`}>
        <header className="buildHeader">
          <img src={classImageUrl} alt="" />
          <h2 className="buildTitle flat">{c.name}</h2>
        </header>
        <div className="specs">{specList}</div>
      </div>
    )

  })


  return (
    <div>
      <header className="buildsHeader">
        <h1>Choose a build</h1>
        <p className="disclaimer"><strong>Note:</strong> Tier ratings are intended for beginner to average players, if you think otherwise please <a href="https://forms.gle/3mVEXW1CaAmZGWze9" target="_blank" className="link">submit your own ratings</a>.</p>
      </header>
      <div className="builds">
        {buildsList}
      </div>
      <footer className="appFooter">
        <h3 className="appRoll">Not sure what to play?</h3> <Link to="/roll"><button className="small">Roll for it</button></Link>
      </footer>
    </div>
  )

}
