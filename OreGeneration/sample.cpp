if (minPos.x <= maxPos.x)
{
  v98 = *((float *)&v145 + 1);
  v99 = *(float *)&v145;
  v100 = minPos.z;
  v101 = maxPos.z;
  v102 = v139;
  while (1)
  {
    v103 = v85 - v102;
    v152 = v85 - v102;
    orePosProto.z = v100;
    if (v100 <= v101)
    {
      v104 = v103 * v99;
      v153 = v103 * v99;
      do
      {
        v105 = v85 - ((v87 - v143) * v98 + v104) * v99 + v102;
        if ((((v87 - ((v87 - v143) * v98 + v104) * v98 + v143) * (v87 - (float)((float)((float)((float)((float)(v87 - v143) * v98) + v104) * v98) + v143))) + (v105 * v105)) <= v166)
        {
          ChunkPos::ChunkPos(&v174, &orePosProto);
          if (!v88 || (v89 = (LevelChunk *)*((_QWORD *)v176 + v174.x + v150 * (v174.z - v170.z) - v170.x),
                       (v142 = v89) != 0i64))
          {
            orePosProto.y = minPos.y;
            if (minPos.y <= maxPos.y)
            {
              v106 = v149.x;
              v107 = v103 * v149.x;
              v108 = v149.z;
              do
              {
                v109 = (float)((float)(v149.y * (float)(v86 - v20)) + v107) + (float)((float)(v87 - v143) * v149.z);
                if ((float)((float)((float)((float)(v86 - (float)((float)(v149.y * v109) + v20)) * (float)(v86 - (float)((float)(v149.y * v109) + v20))) + (float)((float)(v85 - (float)((float)(v109 * v106) + v139)) * (float)(v85 - (float)((float)(v109 * v106) + v139)))) + (float)((float)(v87 - (float)((float)(v109 * v108) + v143)) * (float)(v87 - (float)((float)(v109 * v108) + v143)))) <= v166)
                {
                  v110 = 0i64;
                  if (replaceRule->counter)
                  {
                    while (1)
                    {
                      v111 = *(float **)(replaceRule->primaryPos + 8 * v110);
                      if ((float)((float)((float)((float)(v86 - v111[1]) * (float)(v86 - v111[1])) + (float)((float)(v85 - *v111) * (float)(v85 - *v111))) + (float)((float)(v87 - v111[2]) * (float)(v87 - v111[2]))) < v111[3])
                        break;
                      if (++v110 >= (unsigned __int64)replaceRule->counter)
                        goto LABEL_138;
                    }
                    v112 = 0i64;
                    v148 = 0i64;
                    if (!v88 || (v112 = LevelChunk::getSubChunk(v89, orePosProto.y >> 4), (v148 = v112) != 0i64))
                    {
                      ChunkBlockPos::ChunkBlockPos(&v167, &orePosProto, v138);
                      packedPos = 16 * v167.z + (v167.y & 0xF) + (v167.x << 8);
                      v113 = v112 ? (*(__int64(__fastcall **)(_QWORD))(**((_QWORD **)v112 + 7) + 24i64))(*((_QWORD *)v112 + 7)) : (*(__int64(__fastcall **)(__int64, BlockPos *))(*(_QWORD *)v6 + 32i64))(v6, &orePosProto);
                      v114 = v113;
                      v155 = v113;
                      v115 = blockData__->field_10;
                      replaceRule = blockData__;
                      if (blockData__->field_10 != blockData__->a)
                      {
                        while (1)
                        {
                          blockData = *(struct Block **)v115;
                          v116 = *(_QWORD *)(v114 + 16);
                          if (!v116)
                            gsl::details::terminate(0i64);
                          v117 = *(_QWORD **)(v115 + 8);
                          v118 = *(_QWORD **)(v115 + 16);
                          if (v117 != v118)
                          {
                            while (v116 != *v117)
                            {
                              if (++v117 == v118)
                                goto LABEL_132;
                            }
                            if (v114 != *(_QWORD *)v115)
                            {
                              v119 = this->discard_chance_on_air_exposure;
                              if (*(float *)&v119 <= 0.0 || *(float *)&v119 < 1.0 && (*((float(__fastcall **)(Random *))random->vftable + 5))(random) >= *(float *)&v119)
                              {
                              LABEL_109:
                                generateWhenExpose = 0;
                              }
                              else
                              {
                                v120 = HashedString::HashedString(&v162, "air");
                                v121 = BlockDescriptor::BlockDescriptor(&v161, v120);
                                v9 = (ChunkBlockPos)(*(_DWORD *)&v9 | 3);
                                v122 = 0;
                                while (1)
                                { // 检测是否暴露在空气中
                                  v123 = *(__int64(__fastcall **)(__int64, _DWORD *))(*(_QWORD *)v6 + 32i64);
                                  v124 = BlockPos::neighbor(&orePosProto, v160, v122);
                                  v125 = (const struct Block *)v123(v6, v124);
                                  if (BlockDescriptor::matches(v121, v125))
                                    break;
                                  if (++v122 >= 6u)
                                    goto LABEL_109;
                                }
                                generateWhenExpose = 1;
                              }
                              if ((v9.x & 2) != 0)
                              {
                                v9 = (ChunkBlockPos)(*(_DWORD *)&v9 & 0xFFFFFFFD);
                                _singleTick___StrictTickingSystemFunctionAdapter__MP6AXV__ViewT_VStrictEntityContext__VEntityRegistryBase__U__Include_V__FlagComponent_UActorMovementTickNeededFlag____V__FlagComponent_UUsesECSMovementFlag____V__FlagComponent_UAgentFlag______VActorMovementProxyComponent__VActorOwnerComponent_____Z1_tickClient_AgentTravelSystem__SAX0_Z_M__VS__MEAAXAEAV__StrictExecutionContext_U__Filter_V__FlagComponent_UActorMovementTickNeededFlag____V__FlagComponent_UUsesECSMovementFlag____V__FlagComponent_UAgentFlag______U__Read___V__U__Write_VActorMovementProxyComponent__VActorOwnerComponent____U__AddRemove___V__U__GlobalRead___V__U__GlobalWrite___V__U__EntityFactoryT___V____AEAVStrictEntityContext___Z((ULONG_PTR)&v161.spinLock);
                                v127 = (char *)v161.d;
                                if (v161.d)
                                {
                                  v128 = v161.e;
                                  if (v161.d != v161.e)
                                  {
                                    do
                                    {
                                      std::pair<enum BlockActorType const, std::string>::~pair<enum BlockActorType const, std::string>(v127);
                                      v127 += 72;
                                    } while (v127 != (char *)v128);
                                    v127 = (char *)v161.d;
                                  }
                                  v129 = 72 * ((signed __int64)(v161.f - (_QWORD)v127) / 72);
                                  v130 = v127;
                                  if (v129 >= 0x1000)
                                  {
                                    v129 += 39i64;
                                    v127 = (char *)*((_QWORD *)v127 - 1);
                                    if ((unsigned __int64)(v130 - v127 - 8) > 0x1F)
                                      _invalid_parameter_noinfo_noreturn();
                                  }
                                  operator delete(v127, (const struct std::nothrow_t *)v129);
                                  v161.d = 0i64;
                                  *(_OWORD *)&v161.e = 0i64;
                                }
                                v131 = (volatile signed __int32 *)v161.c;
                                if (v161.c)
                                {
                                  if (_InterlockedExchangeAdd((volatile signed __int32 *)(v161.c + 8), 0xFFFFFFFF) == 1)
                                  {
                                    (**(void(__fastcall ***)(volatile signed __int32 *))v131)(v131);
                                    if (_InterlockedExchangeAdd(v131 + 3, 0xFFFFFFFF) == 1)
                                      (*(void(__fastcall **)(volatile signed __int32 *))(*(_QWORD *)v131 + 8i64))(v131);
                                  }
                                }
                                std::pair<enum BlockActorType const, std::string>::~pair<enum BlockActorType const, std::string>(&v161.fullName);
                              }
                              if ((v9.x & 1) != 0)
                              {
                                v9 = (ChunkBlockPos)(*(_DWORD *)&v9 & 0xFFFFFFFE);
                                if (v163 >= 0x10)
                                {
                                  v132 = (const struct std::nothrow_t *)(v163 + 1);
                                  v133 = *(void **)v162.str;
                                  if (v163 + 1 >= 0x1000)
                                  {
                                    v132 = (const struct std::nothrow_t *)(v163 + 40);
                                    v133 = *(void **)(*(_QWORD *)v162.str - 8i64);
                                    if ((unsigned __int64)(*(_QWORD *)v162.str - (_QWORD)v133 - 8i64) > 0x1F)
                                      _invalid_parameter_noinfo_noreturn();
                                  }
                                  operator delete(v133, v132);
                                }
                              }
                              v88 = v135;
                              if (!generateWhenExpose)
                              {
                                if (v135)
                                {
                                  SubChunk::_setBlock(v148, 0, packedPos, blockData);
                                LABEL_136:
                                  ++v140;
                                  replaceRule = blockData__;
                                LABEL_137:
                                  v20 = v136;
                                  break;
                                }
                                if ((*(unsigned __int8(__fastcall **)(__int64, BlockPos *, struct Block *))(*(_QWORD *)v6 + 80i64))(
                                        v6,
                                        &orePosProto,
                                        blockData))
                                {
                                  goto LABEL_136;
                                }
                              }
                              replaceRule = blockData__;
                              v114 = v155;
                            }
                          }
                        LABEL_132:
                          v115 += 32i64;
                          if (v115 == replaceRule->a)
                            goto LABEL_137;
                        }
                      }
                    }
                  }
                }
              LABEL_138:
                ++orePosProto.y;
                v86 = v86 + 1.0;
                v106 = *(float *)&v159;
                v108 = v149.z;
                v89 = v142;
              } while (orePosProto.y <= maxPos.y);
              v103 = v152;
            }
          }
          v101 = maxPos.z;
          v100 = orePosProto.z;
          v98 = *((float *)&v145 + 1);
          v99 = *(float *)&v145;
          v89 = v142;
        }
        orePosProto.z = ++v100;
        v87 = v87 + 1.0;
        v102 = v139;
        v104 = v153;
        v86 = v141;
      } while (v100 <= v101);
      v100 = minPos.z;
      v97 = maxPos.x;
      v96 = orePosProto.x;
    }
    orePosProto.x = ++v96;
    v85 = v85 + 1.0;
    if (v96 > v97)
      break;
    v87 = v154;
  }
  if (v140)
  {
    *(_QWORD *)&v172 = 0i64;
    DWORD2(v172) = 0;
    BYTE12(v172) = 1;
    result = a2;
    *(_OWORD *)a2 = v172;
    return result;
  }
}