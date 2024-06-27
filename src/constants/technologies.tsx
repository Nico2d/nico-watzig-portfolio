import {
	AiFillHtml5,
	AiOutlineAntDesign,
	AiFillGithub,
	AiFillGitlab,
} from 'react-icons/ai'
import { DiCss3, DiVisualstudio } from 'react-icons/di'
import { IoLogoJavascript } from 'react-icons/io'
import { FaReact, FaWordpressSimple, FaFigma, FaTrello } from 'react-icons/fa'
import { BsBootstrap } from 'react-icons/bs'
import { TbBrandNextjs, TbBrandTailwind } from 'react-icons/tb'
import { RiFlutterFill } from 'react-icons/ri'

export const TECHNOLOGIES = [
	{
		category: 'Mobile',
		items: [{ name: 'Flutter', icon: <RiFlutterFill size={32} /> }],
	},
	{
		category: 'Front-end',
		items: [
			{ name: 'HTML', icon: <AiFillHtml5 size={32} /> },
			{ name: 'CSS', icon: <DiCss3 size={32} /> },
			{ name: 'JS', icon: <IoLogoJavascript size={32} /> },
			{ name: 'React', icon: <FaReact size={32} /> },
			{ name: 'Next', icon: <TbBrandNextjs size={32} /> },
			{ name: 'Tailwind CSS', icon: <TbBrandTailwind size={32} /> },
			{ name: 'AntD', icon: <AiOutlineAntDesign size={32} /> },
			{ name: 'Bootstrap', icon: <BsBootstrap size={32} /> },
		],
	},
	{
		category: 'UI tools',
		items: [{ name: 'Figma', icon: <FaFigma size={32} /> }],
	},
	{
		category: 'Other tools',
		items: [
			{ name: 'WordPress CMS', icon: <FaWordpressSimple size={32} /> },
			{ name: 'Trello', icon: <FaTrello size={32} /> },
			{ name: 'Github', icon: <AiFillGithub size={32} /> },
			{ name: 'Gitlab', icon: <AiFillGitlab size={32} /> },
			{ name: 'VsCode', icon: <DiVisualstudio size={32} /> },
		],
	},
]
