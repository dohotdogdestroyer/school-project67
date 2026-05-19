import { useState } from 'react';
import { Wrench, Droplets, ShieldAlert, CheckCircle, AlertTriangle, Package } from 'lucide-react';

interface Step {
  step: number;
  title: string;
  description: string;
  tip?: string;
}

const standardSteps: Step[] = [
  {
    step: 1,
    title: 'Prepare Your Workspace',
    description:
      'Clear a large, flat surface — a wooden desk or table works great. Avoid carpets (static electricity). Unbox all your components and keep them in their anti-static bags until needed.',
    tip: 'Ground yourself by touching a metal surface (like the PC case) before handling components to discharge static.',
  },
  {
    step: 2,
    title: 'Install the CPU',
    description:
      'Open the CPU socket on the motherboard by lifting or pressing the retention lever. Align the CPU with the socket (match the arrow or notches), gently place it in without forcing, and secure the lever.',
    tip: 'Never press down on the CPU — it should drop into place with zero force. Bent pins ruin a CPU.',
  },
  {
    step: 3,
    title: 'Install RAM',
    description:
      'Check your motherboard manual for the correct RAM slots (usually slots 2 and 4 for dual channel). Press the tabs on each slot outward, align the RAM notch with the slot, and press firmly until it clicks.',
    tip: 'Use two identical RAM sticks in matching slots for dual-channel mode — nearly doubles memory bandwidth.',
  },
  {
    step: 4,
    title: 'Install M.2 SSD (if applicable)',
    description:
      'Locate the M.2 slot on your motherboard. Remove the retaining screw, slide the SSD in at a 30-degree angle into the slot, then press it flat and secure with the screw.',
    tip: 'Some motherboards have a heatsink over the M.2 slot — remove it first, install the SSD, then re-attach.',
  },
  {
    step: 5,
    title: 'Mount Motherboard in Case',
    description:
      'Install the I/O shield that came with your motherboard into the back of the case. Screw in the brass standoffs in the correct positions, place the motherboard on them (aligning I/O ports with the shield), and screw it in snugly.',
    tip: 'Do not overtighten screws — hand-tight plus a quarter turn is enough to avoid cracking the board.',
  },
  {
    step: 6,
    title: 'Install CPU Cooler',
    description:
      'Apply a small pea-sized amount of thermal paste to the center of the CPU (skip if the cooler has pre-applied paste). Mount the cooler according to its instructions, attaching the mounting bracket securely.',
    tip: 'Ensure the fan header cable reaches the CPU_FAN header on the motherboard.',
  },
  {
    step: 7,
    title: 'Install the PSU',
    description:
      'Slide the PSU into its bay (usually bottom or rear of the case). Align the screw holes and fasten with the included screws. Orient the fan downward if there\'s a bottom vent, or upward if not.',
    tip: 'With a modular PSU, only connect the cables you need to reduce clutter.',
  },
  {
    step: 8,
    title: 'Install the GPU',
    description:
      'Remove the PCIe slot covers on the case back panel. Press the release tab on the top PCIe x16 slot, align the GPU and press firmly until it clicks in. Secure with screws. Connect the PCIe power cables from the PSU.',
    tip: 'Most modern GPUs need 1-3 PCIe power connectors. Always connect them — running a GPU without power connectors can damage it.',
  },
  {
    step: 9,
    title: 'Connect All Cables',
    description:
      'Connect the 24-pin ATX power to the motherboard, 4/8-pin CPU power to the top of the board, SATA power to drives, case fan headers, and front-panel connectors (power button, USB, audio). Consult the manual for front-panel pin layout.',
    tip: 'Route cables through grommets and behind the motherboard tray for clean airflow and aesthetics.',
  },
  {
    step: 10,
    title: 'First Boot & BIOS Setup',
    description:
      'Connect your monitor, keyboard, and mouse. Power on and press the BIOS key (usually DEL or F2). Verify RAM is running at XMP/EXPO speed, set boot order to your SSD/USB, and then install your operating system.',
    tip: 'If the PC doesn\'t POST, check RAM is seated, CPU power is connected, and the GPU display cable is in the GPU (not the motherboard).',
  },
];

const waterCoolingSteps: Step[] = [
  {
    step: 1,
    title: 'Plan Your Loop',
    description:
      'Decide on AIO (All-In-One) or custom loop. AIOs are pre-filled and easy — ideal for beginners. Custom loops require a pump/reservoir, water blocks, radiator(s), tubing, fittings, and coolant. Plan tube routing before buying parts.',
    tip: 'For first-time water cooling, start with an AIO cooler — it\'s essentially plug-and-play with much better cooling than stock.',
  },
  {
    step: 2,
    title: 'Gather Extra Components',
    description:
      'For custom loops you\'ll need: CPU water block, GPU water block (optional), pump + reservoir combo, at least one radiator, soft or hard tubing, compression fittings, coolant or distilled water + biocide, and a fill port/drain valve.',
  },
  {
    step: 3,
    title: 'Install Radiator(s)',
    description:
      'Mount the radiator to the case (top, front, or rear). Attach case fans to the radiator — intake or exhaust depending on your airflow strategy. Most 240mm or 360mm radiators go in the top or front of mid-tower cases.',
    tip: 'Push-pull fan configuration (fans on both sides of radiator) improves cooling performance by up to 15%.',
  },
  {
    step: 4,
    title: 'Mount CPU Water Block',
    description:
      'Apply thermal paste to the CPU. Mount the water block using the AMD or Intel backplate/bracket that came with it. Connect the water block fittings — these will connect to your tubing.',
    tip: 'Ensure the water block mounting pressure is even. An uneven mount dramatically reduces thermal performance.',
  },
  {
    step: 5,
    title: 'Mount Pump & Reservoir',
    description:
      'Install the pump/reservoir combo in a drive bay or mount it to the case. Connect the pump to a PUMP_FAN or SYS_FAN header on the motherboard for speed monitoring, and plug it into the PSU via a SATA or Molex adapter.',
    tip: 'Position the reservoir above the pump to ensure the pump never runs dry (prevents cavitation damage).',
  },
  {
    step: 6,
    title: 'Run Tubing & Connect Fittings',
    description:
      'Plan your loop order: reservoir → pump → CPU block → (GPU block) → radiator → back to reservoir. Cut tubing to length, attach compression fittings, and connect each component. For hard tubing, heat with a heat gun to bend.',
    tip: 'For soft tubing, use a coil spring insert to prevent kinks at bends.',
  },
  {
    step: 7,
    title: 'Fill, Bleed, and Leak Test',
    description:
      'Fill the reservoir with coolant. Power on the pump (use a PSU jumper wire so no other components run) and slowly top up the reservoir as air bubbles escape. Tilt the case gently to help purge air pockets.',
    tip: 'Run the pump overnight with paper towels under fittings to catch any slow leaks before the system is fully assembled.',
  },
  {
    step: 8,
    title: 'Install Remaining Components & Final Boot',
    description:
      'Once leak-tested for at least 24 hours with no issues, finish installing the GPU, connect all power cables, and boot the system. Monitor temperatures — a well-built custom loop should keep a CPU 10-20°C cooler than a top-end AIO.',
    tip: 'Use monitoring software (HWiNFO, GPU-Z) to verify temperatures immediately on first boot.',
  },
];

const safetyTips = [
  { icon: ShieldAlert, text: 'Always discharge static electricity before handling components by touching a grounded metal surface.' },
  { icon: AlertTriangle, text: 'Never force components — if it doesn\'t fit easily, check alignment and compatibility.' },
  { icon: CheckCircle, text: 'Work in a well-lit area and keep small screws in a bowl to prevent losing them.' },
  { icon: AlertTriangle, text: 'Do not power on the PC if you suspect a water cooling leak — water and electricity are dangerous.' },
  { icon: CheckCircle, text: 'Keep your motherboard manual nearby — it has the exact pinout for every connector.' },
  { icon: ShieldAlert, text: 'Wear an anti-static wrist strap when possible, especially when working with RAM and CPUs.' },
];

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex gap-5 group">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold text-sm flex-shrink-0 group-hover:bg-cyan-500/30 transition-colors">
          {step.step}
        </div>
        {step.step !== 10 && step.step !== 8 && (
          <div className="w-px flex-1 bg-gradient-to-b from-cyan-500/30 to-transparent mt-2" />
        )}
      </div>
      <div className="pb-8">
        <h4 className="text-white font-bold text-base mb-2">{step.title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">{step.description}</p>
        {step.tip && (
          <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-200/80 text-sm">{step.tip}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PCBuilding() {
  const [activeGuide, setActiveGuide] = useState<'standard' | 'water'>('standard');

  return (
    <section id="pc-building" className="py-24 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Wrench className="w-4 h-4" />
            Build Guides
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            How to Build a PC
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Follow these step-by-step guides to build your first PC. Choose between a standard air-cooled build or a water-cooled setup.
          </p>
        </div>

        {/* Guide Selector */}
        <div className="flex gap-3 mb-10 p-1.5 bg-slate-800/60 rounded-2xl border border-slate-700/50 max-w-sm mx-auto">
          <button
            onClick={() => setActiveGuide('standard')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeGuide === 'standard'
                ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Wrench className="w-4 h-4" />
            Standard Build
          </button>
          <button
            onClick={() => setActiveGuide('water')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeGuide === 'water'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Droplets className="w-4 h-4" />
            Water Cooling
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps */}
          <div className="lg:col-span-2">
            {activeGuide === 'standard' ? (
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-cyan-500/15 rounded-xl">
                    <Wrench className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Standard PC Build Guide</h3>
                    <p className="text-slate-400 text-sm">10 steps — Beginner Friendly</p>
                  </div>
                </div>
                <div>
                  {standardSteps.map((step) => (
                    <StepCard key={step.step} step={step} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-blue-500/20 rounded-2xl p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-blue-500/15 rounded-xl">
                    <Droplets className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Water Cooling Guide</h3>
                    <p className="text-slate-400 text-sm">8 steps — Intermediate Level</p>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-8">
                  <p className="text-blue-300 text-sm">
                    This guide assumes your standard components (CPU, RAM, GPU, etc.) are already installed. Water cooling replaces your standard air cooler.
                  </p>
                </div>
                <div>
                  {waterCoolingSteps.map((step) => (
                    <StepCard key={step.step} step={step} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Safety Tips */}
            <div className="bg-slate-800/40 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <h3 className="text-white font-bold">Safety Tips</h3>
              </div>
              <div className="space-y-3">
                {safetyTips.map((tip, i) => {
                  const Icon = tip.icon;
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <Icon className="w-4 h-4 text-red-400/70 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-400 text-xs leading-relaxed">{tip.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Water Cooling Extra Parts */}
            {activeGuide === 'water' && (
              <div className="bg-slate-800/40 border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Package className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-bold">Extra Parts Needed</h3>
                </div>
                <div className="space-y-2">
                  {[
                    'CPU water block',
                    'Pump + reservoir combo',
                    'Radiator (240mm, 360mm)',
                    'Case fans (for radiator)',
                    'Soft or hard tubing',
                    'Compression fittings',
                    'Coolant or distilled water',
                    'Biocide (anti-algae)',
                    'Drain valve / fill port',
                    'GPU water block (optional)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Checklist */}
            <div className="bg-slate-800/40 border border-green-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h3 className="text-white font-bold">Pre-Build Checklist</h3>
              </div>
              <div className="space-y-2">
                {[
                  'All parts are compatible (use PCPartPicker)',
                  'Workspace is clear and grounded',
                  'Motherboard manual is nearby',
                  'Anti-static precautions taken',
                  'Screwdriver (Phillips #2) ready',
                  'Thermal paste available',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400/60 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
