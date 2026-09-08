// import Tabs from '../../../../components/tabs/tabs'

import Tabs from "#/components/tab/tabs"

const dummyPanels = (prefix: string) => (
  <>
    <Tabs.Content value="overview">
      <p className="text-sm text-muted">
        {prefix} — Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quas, consequatur magnam excepturi accusantium perferendis asperiores
        quasi sapiente consequuntur! Provident velit aliquid aspernatur dolores
        quidem sed ex minima maxime ipsam, veniam voluptatum recusandae quis
        obcaecati nobis optio, corporis tempore at perspiciatis incidunt aut
        consequatur corrupti eveniet id error. Cum magni possimus aliquam
        doloribus eligendi dicta repellat sapiente saepe, eius id! Vel officiis
        vero dolorum numquam debitis cumque cupiditate tempore accusamus
        tenetur.
      </p>
    </Tabs.Content>
    <Tabs.Content value="activity">
      <p className="text-sm text-muted">
        {prefix} — Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Harum officia quae eius ipsa accusamus quibusdam nesciunt veniam
        repudiandae quisquam modi optio, quaerat iure magnam minima soluta
        doloremque esse cum ratione nemo necessitatibus dolores praesentium, at
        sequi. Ut, nemo tempora minima at odio ipsam deserunt officia dolorem
        dolorum eveniet commodi modi nam dicta corporis, vero consequuntur
        pariatur aut, excepturi eaque dolor.
      </p>
    </Tabs.Content>
    <Tabs.Content value="settings">
      <p className="text-sm text-muted">
        {prefix} — Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Amet a nihil maxime ut praesentium aut natus numquam dolorem blanditiis
        molestias, beatae, eligendi modi, consectetur reiciendis pariatur vitae
        in sit officia temporibus magni. In suscipit aspernatur, quibusdam sequi
        aliquid a architecto assumenda at nostrum maxime magnam voluptatibus?
        Nostrum eaque impedit, aut dolorem harum assumenda vero alias hic omnis
        perspiciatis aperiam iusto dignissimos odit, quidem commodi reiciendis
        magnam rerum delectus tempora possimus quasi veritatis consequuntur
        molestias? Est error facere voluptatum a perferendis atque quaerat
        cupiditate optio quo illum? Sequi illum accusamus dolorum.
      </p>
    </Tabs.Content>
  </>
)

export default dummyPanels
