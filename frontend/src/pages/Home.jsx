
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiLayers,
  FiUsers,
  FiTrendingUp,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";

const features = [
  {
    icon: FiLayers,
    title: "Project Management",
    description:
      "Organize your projects, track progress, and keep everything in one place.",
  },
  {
    icon: FiCheckCircle,
    title: "Task Tracking",
    description:
      "Create tasks, set priorities, and follow every task from start to finish.",
  },
  {
    icon: FiUsers,
    title: "Team Collaboration",
    description:
      "Assign responsibilities and help your team work together efficiently.",
  },
];

const steps = [
  "Create and organize your projects",
  "Assign tasks to your team members",
  "Track progress from one dashboard",
];

function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute -right-32 -top-24 h-96 w-96 rounded-full bg-indigo-100/70 blur-3xl" />
        <div className="absolute -bottom-20 -left-32 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">
              <FiTrendingUp />
              A smarter way to work
            </div>

            <h1 className="mt-7 text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
              Turn your plans into{" "}
              <span className="text-indigo-600">progress.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              TaskFlow helps you manage projects, organize tasks, and
              collaborate with your team — all from one simple workspace.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Get started
                <FiArrowRight />
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <FiCheck className="text-emerald-600" />
                Organized workflow
              </span>
              <span className="flex items-center gap-2">
                <FiCheck className="text-emerald-600" />
                Team collaboration
              </span>
            </div>
          </div>

          {/* CSS dashboard preview */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-indigo-100/70 sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm text-slate-500">Workspace overview</p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Your projects
                  </h2>
                </div>

                <span className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">
                  Preview
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-indigo-50 p-4">
                  <p className="text-sm text-indigo-700">Projects</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">04</p>
                  <p className="mt-1 text-xs text-slate-500">Stay organized</p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-sm text-emerald-700">Completed</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">12</p>
                  <p className="mt-1 text-xs text-slate-500">Keep progressing</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">Recent tasks</h3>
                  <span className="text-xs text-slate-400">Sample data</span>
                </div>

                {[
                  {
                    title: "Design project dashboard",
                    status: "In progress",
                    color: "bg-amber-100 text-amber-700",
                    width: "w-2/3",
                  },
                  {
                    title: "Create task management flow",
                    status: "Completed",
                    color: "bg-emerald-100 text-emerald-700",
                    width: "w-full",
                  },
                  {
                    title: "Prepare team workspace",
                    status: "To do",
                    color: "bg-slate-100 text-slate-600",
                    width: "w-1/3",
                  },
                ].map((task) => (
                  <div
                    key={task.title}
                    className="mb-3 rounded-xl border border-slate-100 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-slate-800">
                        {task.title}
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${task.color}`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full bg-indigo-500 ${task.width}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-xl sm:flex">
              <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
                <FiCheckCircle size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Stay on track</p>
                <p className="text-xs text-slate-500">One task at a time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Everything you need
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Work better, together
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Simple tools to help you organize work and keep your team aligned.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                <div className="inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600">
                  <Icon size={25} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Simple workflow
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              From your first idea to your final result.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Keep your work structured, make responsibilities clear, and
              follow your progress without unnecessary complexity.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
                  {index + 1}
                </div>
                <p className="font-semibold text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-indigo-600 px-7 py-14 text-center sm:px-14 sm:py-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to organize your work?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-indigo-100">
            Create your account and start bringing your projects and tasks
            together in TaskFlow.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            Get started for free
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;