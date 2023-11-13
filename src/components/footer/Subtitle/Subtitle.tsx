import "./Subtitle.scss"

export default function Subtitle(props: { title: string }) {
  const { title } = props

  return (
    <div className="Subtitle">
      <h2>{title}</h2>
      <p>
        {`He collected the plastic trash on a daily basis. It never seemed to end.
        Even if he cleaned the entire beach, more plastic would cover it the
        next day after the tide had come in. Although it was a futile effort
        that would never be done, he continued to pick up the trash each day.`}
      </p>
      <p>
        {`It was difficult to explain to them how the diagnosis of certain death
        had actually given him life. While everyone around him was in tears and
        upset, he actually felt more at ease. The doctor said it would be less
        than a year. That gave him a year to live, something he'd failed to do
        with his daily drudgery of a routine that had passed as life until then.`}
      </p>
      <p>
        {`There are different types of secrets. She had held onto plenty of them
        during her life, but this one was different. She found herself holding
        onto the worst type. It was the type of secret that could gnaw away at
        your insides if you didn't tell someone about it, but it could end up
        getting you killed if you did.`}
      </p>
      <p>
        {`There was no time. He ran out of the door without half the stuff he
        needed for work, but it didn't matter. He was late and if he didn't make
        this meeting on time, someone's life may be in danger.`}
      </p>
      <p>
        {`The cab arrived late. The inside was in as bad of shape as the outside
        which was concerning, and it didn't appear that it had been cleaned in
        months. The green tree air-freshener hanging from the rearview mirror
        was either exhausted of its scent or not strong enough to overcome the
        other odors emitting from the cab. The correct decision, in this case,
        was to get the hell out of it and to call another cab, but she was late
        and didn't have a choice.`}
      </p>
      <p>
        {`Barbara had been waiting at the table for twenty minutes. it had been
        twenty long and excruciating minutes. David had promised that he would
        be on time today. He never was, but he had promised this one time. She
        had made him repeat the promise multiple times over the last week until
        she'd believed his promise. Now she was paying the price.`}
      </p>
    </div>
  )
}
