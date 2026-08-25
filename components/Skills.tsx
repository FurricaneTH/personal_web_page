"use client";

const skillCategories = [
  {
    title: "Programlama Dilleri",
    color: "slate",
    skills: [
      { name: "Python", level: 80, emoji: "🐍" },
      { name: "Java", level: 65, emoji: "☕" },
      { name: "C", level: 60, emoji: "⚙️" },
      { name: "JavaScript", level: 70, emoji: "🌐" },
    ],
  },
  {
    title: "Web Teknolojileri",
    color: "indigo",
    skills: [
      { name: "HTML", level: 85, emoji: "🧱" },
      { name: "CSS", level: 75, emoji: "🎨" },
    ],
  },
  {
    title: "Araçlar & Platformlar",
    color: "purple",
    skills: [
      { name: "Git", level: 72, emoji: "🔀" },
      { name: "MySQL", level: 68, emoji: "🗄️" },
      { name: "VSCode", level: 90, emoji: "💻" },
      { name: "PyCharm", level: 75, emoji: "🐍" },
    ],
  },
  {
    title: "Kütüphaneler & Framework",
    color: "cyan",
    skills: [
      { name: "Pandas", level: 75, emoji: "📊" },
      { name: "scikit-learn", level: 65, emoji: "🤖" },
      { name: "NumPy", level: 60, emoji: "🔢" },
    ],
  },
];

const colorMap: Record<string, string> = {
  slate: "bg-slate-600",
  indigo: "bg-indigo-600",
  purple: "bg-purple-600",
  cyan: "bg-cyan-600",
};

const bgColorMap: Record<string, string> = {
  slate: "bg-slate-100 dark:bg-slate-900/20 border-slate-200 dark:border-slate-700",
  indigo: "bg-indigo-100 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
  purple: "bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
  cyan: "bg-cyan-100 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800",
};

const titleColorMap: Record<string, string> = {
  slate: "text-slate-700 dark:text-slate-300",
  indigo: "text-indigo-700 dark:text-indigo-300",
  purple: "text-purple-700 dark:text-purple-300",
  cyan: "text-cyan-700 dark:text-cyan-300",
};

export default function Skills() {
  return (
    <section
      id="beceriler"
      className="py-24 px-4 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm uppercase tracking-widest mb-2">
            Neler Yapabilirim
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Teknik Beceriler
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-slate-500 to-slate-300 rounded-full mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((category, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border ${bgColorMap[category.color]} transition-all duration-300 hover:shadow-lg`}
            >
              <h3 className={`font-bold text-lg mb-5 ${titleColorMap[category.color]}`}>
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, j) => (
                  <div key={j}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <span>{skill.emoji}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        %{skill.level}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${colorMap[category.color]} transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Aşina olduğum diğer teknolojiler:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["IntelliJ IDEA", "MySQL Workbench", "Linux", "REST API", "HTML5 Canvas", "Web Audio API", "OOP", "Veri Yapıları"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
