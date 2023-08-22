/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
'use client'
import { TextField, Autocomplete } from '@mui/material'
import { useState, ChangeEvent, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Jazzicon from 'react-jazzicon'

interface ModalProps {
  onUpdate(): void
  scrollManually(): void
  openProjectsNumber: number
  activeProjectsNumber: number
  completedProjectsNumber: number
}

type DepartamentData = {
  name: string
  tags: string[]
  funding: string
  desc: string
  img: string
  imgClassName: string
}

const FilterModal = ({
  onUpdate,
  scrollManually,
  openProjectsNumber,
  activeProjectsNumber,
  completedProjectsNumber,
}: ModalProps) => {
  const [tasksStatus, setTasksStatus] = useState('')
  const [tasksOrderBy, setTasksOrderBy] = useState('')
  const [tasksSearchBar, setTasksSearchBar] = useState('')
  const [departament, setDepartament] = useState('All')
  const [departamentSelected, setDepartamentSelected] =
    useState<DepartamentData>({
      name: 'All',
      tags: ['Data', 'Graph', 'LLM', 'Solidity', 'Rust', 'Contracts'],
      funding: '330,231',
      desc: 'Introducing the OpenR&D initiative, an open-source platform designed to empower decentralized teams to collaborate seamlessly. Simplify task management, progress tracking, and automated payouts within web3 projects, addressing the challenges faced by remote teams in the rapidly growing decentralized ecosystem.',
      img: '/images/departaments/paper.svg',
      imgClassName: 'mr-1 mb-1 w-[16px]',
    })

  const pathname = usePathname()

  const statusOptions = ['open', 'active', 'completed']

  const departamentOptions = [
    {
      name: 'All',
      tags: ['Data', 'Graph', 'LLM', 'Solidity', 'Rust', 'Contracts'],
      funding: '330,231',
      desc: 'Introducing the OpenR&D initiative, an open-source platform designed to empower decentralized teams to collaborate seamlessly. Simplify task management, progress tracking, and automated payouts within web3 projects, addressing the challenges faced by remote teams in the rapidly growing decentralized ecosystem.',
      img: '/images/departaments/paper.svg',
      imgClassName: 'mr-1 mb-1 w-[16px]',
    },
    {
      name: 'Data',
      tags: ['Data', 'Graph', 'LLM'],
      funding: '11,231',
      desc: 'Introducing the OpenR&D initiative, an open-source platform designed to empower decentralized teams to collaborate seamlessly. Simplify task management, progress tracking, and automated payouts within web3 projects, addressing the challenges faced by remote teams in the rapidly growing decentralized ecosystem.',
      img: '/images/departaments/data.svg',
      imgClassName: 'mr-1 mb-1 w-[16px]',
    },
    {
      name: 'Blockchain',
      tags: ['Solidity', 'Rust', 'Contracts'],
      funding: '89,231',
      desc: 'Introducing the OpenR&D initiative, an open-source platform designed to empower decentralized teams to collaborate seamlessly. Simplify task management, progress tracking, and automated payouts within web3 projects, addressing the challenges faced by remote teams in the rapidly growing decentralized ecosystem.',
      img: '/images/departaments/blockchain.svg',
      imgClassName: 'mr-1 mb-1 w-[16px]',
    },
    {
      name: 'Cloud',
      tags: ['DevOps', 'AWS', 'Kubernets'],
      funding: '151,231',
      desc: 'Introducing the OpenR&D initiative, an open-source platform designed to empower decentralized teams to collaborate seamlessly. Simplify task management, progress tracking, and automated payouts within web3 projects, addressing the challenges faced by remote teams in the rapidly growing decentralized ecosystem.',
      img: '/images/departaments/cloud.svg',
      imgClassName: 'mr-1 mb-1 w-[19px]',
    },
    {
      name: 'Frontend',
      tags: ['Web', 'Mobile', 'Desktop'],
      funding: '51,231',
      desc: 'Introducing the OpenR&D initiative, an open-source platform designed to empower decentralized teams to collaborate seamlessly. Simplify task management, progress tracking, and automated payouts within web3 projects, addressing the challenges faced by remote teams in the rapidly growing decentralized ecosystem.',
      img: '/images/departaments/pointer.svg',
      imgClassName: 'mr-1 mb-1 w-[13px]',
    },
  ]
  const orderByOptions = ['Newest', 'Oldest']

  const handleStatusSelection = (value: string | null) => {
    setTasksStatus(value)
    updateUrl('status', value)
  }

  const handleOrderBySelection = (event: any, value: string | null) => {
    setTasksOrderBy(value)
    updateUrl('orderBy', value)
  }

  const handleSearchBarInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const value = input.value

    if (tasksSearchBar.length + value.length > 100) {
      return
    }

    setTasksSearchBar(value)

    if (value === '') {
      updateUrl('searchBar', value)
    }
  }

  const handleDepartamentSelection = (value: string) => {
    updateUrl('departament', value)
    setDepartament(value)
    // setar setDepartamentSelected() passando o departament que tem o parametro "name" igual ao value que essa func recebe
    const selectedDepartament = departamentOptions.find(
      (departament) => departament.name === value,
    )
    setDepartamentSelected(selectedDepartament)
  }

  // Função para atualizar a URL
  const updateUrl = (param: string, value: string | null) => {
    console.log('update chamado com sucesso')
    if (param !== 'page') {
      console.log('nao é page')
      if (typeof window !== 'undefined') {
        console.log('nao é page2')
        const url = new URL(window.location.href)
        url.searchParams.delete('page')
        window.history.pushState({}, '', url.toString())
      }
    }
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)

      if (value) {
        url.searchParams.set(param, value)
      } else {
        url.searchParams.delete(param)
      }

      window.history.pushState({}, '', url.toString())
      onUpdate()
    }
  }

  useEffect(() => {
    setDepartament('All')
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)

      const status = url.searchParams.get('status')
      if (status && statusOptions.includes(status)) setTasksStatus(status)

      const departament = url.searchParams.get('departament')
      if (departament && departament !== 'All') {
        setDepartament(departament)
      }

      const orderBy = url.searchParams.get('orderBy')
      if (orderBy && orderByOptions.includes(orderBy)) setTasksOrderBy(orderBy)

      const searchBar = url.searchParams.get('searchBar')
      if (searchBar && searchBar.length <= 100) setTasksSearchBar(searchBar)
    }
  }, [pathname])

  return (
    <section className="mt-[55px] px-[20px] lg:mt-[34px] lg:px-[100px]">
      <div className="container px-0">
        <div className="mt-[40px] flex overflow-x-auto text-[#000000]">
          <div
            onClick={() => {
              handleStatusSelection('open')
            }}
            className={`cursor-pointer rounded-[10px] border border-[#D4D4D4] px-[15px] py-[10px] hover:bg-[#F1F0F0] lg:w-1/3 lg:px-[25px] lg:py-[20px] ${
              tasksStatus === 'open' ? 'bg-[#F1F0F0]' : ''
            }`}
          >
            <p className="text-[13px] font-bold lg:text-[16px]">
              Open Applications
            </p>
            <p className="w-[150px] text-[11px] font-normal lg:w-full lg:text-[14px]">
              Active applications for projects
            </p>
            <p
              className={`mt-[9px] w-fit text-[20px] font-bold !leading-none lg:text-[26px] ${
                tasksStatus === 'open' ? 'border-b-[2px] border-[#000000]' : ''
              }`}
            >
              {openProjectsNumber}
            </p>
          </div>
          <div
            onClick={() => {
              handleStatusSelection('active')
            }}
            className={`mx-[25px] cursor-pointer rounded-[10px] border border-[#D4D4D4] px-[15px] py-[10px] hover:bg-[#F1F0F0] lg:w-1/3 lg:px-[25px] lg:py-[20px] ${
              tasksStatus === 'active' ? 'bg-[#F1F0F0]' : ''
            }`}
          >
            <p className="text-[13px] font-bold lg:text-[16px]">
              On-going Projects
            </p>
            <p className="w-[150px] text-[11px] font-normal lg:text-[14px]">
              Tasks that are currently in progress{' '}
            </p>
            <p
              className={`mt-[9px] w-fit text-[20px] font-bold !leading-none lg:text-[26px] ${
                tasksStatus === 'active'
                  ? 'border-b-[2px] border-[#000000]'
                  : ''
              }`}
            >
              {activeProjectsNumber}
            </p>
          </div>
          <div
            onClick={() => {
              handleStatusSelection('completed')
            }}
            className={`cursor-pointer rounded-[10px] border border-[#D4D4D4] px-[15px] py-[10px] hover:bg-[#F1F0F0] lg:w-1/3 lg:px-[25px] lg:py-[20px] ${
              tasksStatus === 'completed' ? 'bg-[#F1F0F0]' : ''
            }`}
          >
            <p className="text-[13px] font-bold lg:text-[16px]">
              Completed Projects
            </p>
            <p className="w-[150px] text-[11px]  font-normal lg:text-[14px]">
              Tasks that have been completeds
            </p>
            <p
              className={`mt-[9px] w-fit text-[20px] font-bold !leading-none lg:text-[26px] ${
                tasksStatus === 'completed'
                  ? 'border-b-[2px] border-[#000000]'
                  : ''
              }`}
            >
              {completedProjectsNumber}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FilterModal
