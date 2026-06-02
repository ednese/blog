import { BlogPosts } from 'app/components/posts'
import Image from 'next/image'

export default function Page() {
  return (
    <section>
      <div className="flex gap-6 mb-8">
        <div className="flex-shrink-0 min-w-[120px]">
          <Image
            src="/profilepicture.jpeg"
            alt="Evan Sende"
            width={120}
            height={120}
            className="rounded-full w-[120px] h-[120px] object-cover"
            style={{ width: '120px', height: '120px' }}
            priority
          />
        </div>
        <div>
          <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
            About
          </h1>
          <p className="mb-4">
            {`I'm a Software Engineer specializing in Web Development with React, Vue, and Node.js, currently
            working as a Frontend Developer at Accor and building Dafi AI, with a vision to create
            the Office suite for students.`}
          </p>
        </div>
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
