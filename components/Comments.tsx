import { Giscus } from '@giscus/react'

const Comments = () => {
  return (
    <div id="comments-section" className="border rounded border-gray-400/30 mt-4 p-4 md:-mx-4">
      <Giscus
        repo="hduhelp/giscus-discussions"
        repoId="R_kgDOG4vWdA"
        category="Announcements"
        categoryId="DIC_kwDOG4vWdM4CBRw2"
        mapping="pathname"
        reactionsEnabled="1"
        theme="preferred_color_scheme"
      />
    </div>
  )
}

export default Comments
